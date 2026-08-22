import React, { useEffect, useState } from 'react';
import { Heart, Search, BookmarkCheck, RotateCcw } from 'lucide-react';
import { MenuPreset } from '../types/menu';

interface PresetLibraryProps {
  onLoadPreset: (preset: MenuPreset) => void;
  isRtl: boolean;
}

const LIKED_STORAGE_KEY = 'mobile-menu-ui:liked-presets';
const SEARCH_DEBOUNCE_MS = 300;

function loadLikedIds(): number[] {
  try {
    const raw = localStorage.getItem(LIKED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const PresetLibrary: React.FC<PresetLibraryProps> = ({ onLoadPreset, isRtl }) => {
  const [presets, setPresets] = useState<MenuPreset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [likedIds, setLikedIds] = useState<number[]>(() => loadLikedIds());

  // Debounce search input to avoid a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const query = new URLSearchParams();
        if (debouncedSearch) query.append('search', debouncedSearch);

        const res = await fetch(`/api/menu-presets?${query.toString()}`, {
          signal: controller.signal
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const data = await res.json();

        if (!controller.signal.aborted) {
          setPresets(Array.isArray(data) ? data : []);
          setError(false);
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Failed to fetch presets:', err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    })();

    return () => controller.abort();
  }, [debouncedSearch, refreshKey]);

  const handleLike = async (id: number) => {
    if (likedIds.includes(id)) return;

    const nextLiked = [...likedIds, id];
    setLikedIds(nextLiked);
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(nextLiked));
    } catch {
      /* storage unavailable */
    }

    // Optimistic update
    setPresets((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes_count: p.likes_count + 1 } : p))
    );

    try {
      const res = await fetch('/api/menu-presets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'like' })
      });
      if (!res.ok) throw new Error(`Like failed with status ${res.status}`);
    } catch (err) {
      console.error('Like failed:', err);
      // Roll back on failure
      setLikedIds((prev) => prev.filter((liked) => liked !== id));
      setPresets((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes_count: Math.max(0, p.likes_count - 1) } : p))
      );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-lg space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isRtl ? 'کتابخانه پیش‌فرض‌ها و منوهای آمادۀ دیتابیس' : 'Preset library & saved configurations'}
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRtl
              ? 'پیکربندی‌های ثبت‌شده در Supabase را بررسی کرده و با یک کلیک در ادیتور بارگذاری کنید.'
              : 'Browse pre-built configurations stored in the database & load them into the studio instantly.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search size={15} className="absolute start-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={isRtl ? 'جستجو منو...' : 'Search presets...'}
            aria-label={isRtl ? 'جستجوی پیش‌فرض‌ها' : 'Search presets'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ps-9 pe-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs w-full sm:w-48 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400 animate-pulse" role="status">
          {isRtl ? 'در حال دریافت اطلاعات از دیتابیس...' : 'Loading presets from database...'}
        </div>
      ) : error ? (
        <div className="py-8 text-center space-y-3">
          <p className="text-xs text-rose-500 font-medium">
            {isRtl ? 'خطا در دریافت پیش‌فرض‌ها. لطفاً دوباره تلاش کنید.' : 'Failed to load presets. Please try again.'}
          </p>
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <RotateCcw size={13} />
            <span>{isRtl ? 'تلاش مجدد' : 'Retry'}</span>
          </button>
        </div>
      ) : presets.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400">
          {isRtl ? 'هیچ منویی پیدا نشد.' : 'No presets found matching criteria.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-300 transition-all flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="font-bold text-slate-900 dark:text-white truncate">
                    {preset.title}
                  </span>
                  <span className="shrink-0 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full uppercase">
                    {preset.style_id}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {preset.description || (isRtl ? 'بدون توضیح اضافی' : 'Ready-to-use menu configuration')}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                <button
                  onClick={() => handleLike(preset.id)}
                  aria-pressed={likedIds.includes(preset.id)}
                  aria-label={isRtl ? `پسندیدن ${preset.title}` : `Like ${preset.title}`}
                  className={`flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                    likedIds.includes(preset.id)
                      ? 'text-rose-500 font-bold'
                      : 'text-slate-400 hover:text-rose-500'
                  }`}
                >
                  <Heart size={14} className={likedIds.includes(preset.id) ? 'fill-rose-500' : ''} />
                  <span>{preset.likes_count}</span>
                </button>

                <button
                  onClick={() => onLoadPreset(preset)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-[11px] transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {isRtl ? 'بارگذاری در ادیتور' : 'Load preset'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
