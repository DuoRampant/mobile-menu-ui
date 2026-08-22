-- Atomic like counter for menu presets.
-- Apply in the Supabase SQL editor or via `supabase db push`.
create or replace function public.increment_menu_preset_likes(preset_id bigint)
returns void
language sql
security definer
set search_path = public
as $$
  update public.menu_presets
  set likes_count = likes_count + 1
  where id = preset_id;
$$;
