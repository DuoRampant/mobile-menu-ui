import { timingSafeEqual } from 'node:crypto';
import supabase from './db-client.js';

const MENU_STYLE_IDS = new Set([
  'minimal',
  'glassmorphic',
  'floating',
  'neumorphic',
  'pill',
  'center-fab',
  'gradient',
  'outline',
  'indicator',
  'curved',
  'dock'
]);

const THEME_COLORS = new Set(['indigo', 'emerald', 'rose', 'amber', 'cyan', 'violet', 'obsidian']);

const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_ITEMS = 8;
const MAX_SEARCH_LENGTH = 80;

function setCorsHeaders(req, res) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Token');
}

function safeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

function isWriteAuthorized(req) {
  const expected = process.env.API_ADMIN_TOKEN;
  if (!expected) return false;
  return safeEqual(req.headers['x-admin-token'] || '', expected);
}

// Strip PostgREST filter metacharacters so the search value cannot inject
// additional filters into the .or() expression.
function sanitizeSearch(value) {
  return String(value)
    .replace(/[(),%\\]/g, ' ')
    .trim()
    .slice(0, MAX_SEARCH_LENGTH);
}

function isValidItem(item) {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || item.id.length === 0 || item.id.length > 50) return false;
  if (typeof item.label !== 'string' || item.label.length > 100) return false;
  if (typeof item.icon !== 'string' || item.icon.length > 50) return false;
  if (item.badge !== undefined && typeof item.badge !== 'number' && typeof item.badge !== 'string') {
    return false;
  }
  if (typeof item.badge === 'string' && item.badge.length > 10) return false;
  return true;
}

function validatePresetPayload(body) {
  const errors = [];

  if (typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push('title is required.');
  } else if (body.title.length > MAX_TITLE_LENGTH) {
    errors.push(`title must be at most ${MAX_TITLE_LENGTH} characters.`);
  }

  if (body.description !== undefined && String(body.description).length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`description must be at most ${MAX_DESCRIPTION_LENGTH} characters.`);
  }

  if (!MENU_STYLE_IDS.has(body.style_id)) {
    errors.push('style_id is invalid.');
  }

  const themeColor = body.theme_color || 'indigo';
  if (!THEME_COLORS.has(themeColor)) {
    errors.push('theme_color is invalid.');
  }

  if (!Array.isArray(body.items) || body.items.length < 2 || body.items.length > MAX_ITEMS) {
    errors.push(`items must be an array of 2 to ${MAX_ITEMS} entries.`);
  } else if (!body.items.every(isValidItem)) {
    errors.push('one or more items are malformed.');
  }

  return { errors, themeColor };
}

export default async function handler(req, res) {
  setCorsHeaders(req, res);
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { style_id, search } = req.query || {};
      let query = supabase.from('menu_presets').select('*').order('likes_count', { ascending: false });

      if (style_id && style_id !== 'all') {
        if (!MENU_STYLE_IDS.has(style_id)) {
          return res.status(400).json({ error: 'Invalid style_id filter.' });
        }
        query = query.eq('style_id', style_id);
      }

      const sanitizedSearch = search ? sanitizeSearch(search) : '';
      if (sanitizedSearch) {
        query = query.or(
          `title.ilike.%${sanitizedSearch}%,description.ilike.%${sanitizedSearch}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data || []);
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const { errors, themeColor } = validatePresetPayload(body);
      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(' ') });
      }

      const { data, error } = await supabase
        .from('menu_presets')
        .insert({
          title: body.title.trim(),
          description: body.description ? String(body.description).slice(0, MAX_DESCRIPTION_LENGTH) : '',
          style_id: body.style_id,
          theme_color: themeColor,
          is_dark: Boolean(body.is_dark),
          is_rtl: Boolean(body.is_rtl),
          show_labels: body.show_labels !== false,
          items: body.items,
          likes_count: 0,
          is_official: false
        })
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json(data);
    }

    if (req.method === 'PUT') {
      const { id, action } = req.body || {};
      const numericId = Number(id);
      if (!Number.isInteger(numericId) || numericId <= 0) {
        return res.status(400).json({ error: 'A valid numeric id is required.' });
      }

      if (action === 'like') {
        // Atomic increment via RPC; falls back to read-modify-write when the
        // migration in supabase/migrations has not been applied yet.
        const { data, error } = await supabase.rpc('increment_menu_preset_likes', {
          preset_id: numericId
        });

        if (error && error.code === '42883') {
          const fallback = await supabase
            .from('menu_presets')
            .update({ likes_count: supabase.sql`likes_count + 1` })
            .eq('id', numericId)
            .select()
            .single();
          if (fallback.error) throw fallback.error;
          return res.status(200).json(fallback.data);
        }

        if (error) throw error;
        return res.status(200).json(data ?? { success: true });
      }

      if (!isWriteAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }

      const body = req.body || {};
      const { errors, themeColor } = validatePresetPayload(body);
      if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(' ') });
      }

      const { data, error } = await supabase
        .from('menu_presets')
        .update({
          title: body.title.trim(),
          description: body.description ? String(body.description).slice(0, MAX_DESCRIPTION_LENGTH) : '',
          style_id: body.style_id,
          theme_color: themeColor,
          is_dark: Boolean(body.is_dark),
          is_rtl: Boolean(body.is_rtl),
          show_labels: body.show_labels !== false,
          items: body.items
        })
        .eq('id', numericId)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'DELETE') {
      if (!isWriteAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized.' });
      }

      const numericId = Number(req.body?.id);
      if (!Number.isInteger(numericId) || numericId <= 0) {
        return res.status(400).json({ error: 'A valid numeric id is required.' });
      }

      const { error } = await supabase.from('menu_presets').delete().eq('id', numericId);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (err) {
    console.error('[menu-presets] Request failed:', err);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}
