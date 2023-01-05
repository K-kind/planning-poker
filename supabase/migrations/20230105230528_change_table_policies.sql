drop policy "Allow delete access" on public.rooms;

alter table public.room_users enable row level security;

create policy "Allow select access" on public.room_users
  for select to authenticated using (auth.uid() = user_id);
