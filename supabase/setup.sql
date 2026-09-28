create table if not exists public.pokopia_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  caught jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.pokopia_progress enable row level security;

revoke all on table public.pokopia_progress from anon;
grant select, insert, update on table public.pokopia_progress to authenticated;

drop policy if exists "read own pokopia progress" on public.pokopia_progress;
create policy "read own pokopia progress"
on public.pokopia_progress for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "insert own pokopia progress" on public.pokopia_progress;
create policy "insert own pokopia progress"
on public.pokopia_progress for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "update own pokopia progress" on public.pokopia_progress;
create policy "update own pokopia progress"
on public.pokopia_progress for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);
