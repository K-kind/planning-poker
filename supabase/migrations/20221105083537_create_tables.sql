-- Custom Types
create type public.card_status as enum ('hidden', 'open');

-- Create tables
create table public.rooms (
  id uuid default gen_random_uuid() not null primary key,
  card_status card_status default 'hidden'::public.card_status not null,
  cards int4[] default '{1, 2, 3, 5, 8, 13, 21}' not null,
  players json default '[]' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
create index on public.rooms (updated_at);

-- Extensions and triggers
create extension if not exists moddatetime schema extensions;

create trigger handle_room_updated_at before update on public.rooms
  for each row execute procedure moddatetime (updated_at);

-- Secure the tables
alter table public.rooms enable row level security;

create policy "Allow select access" on public.rooms
  for select to authenticated, anon using (true);
create policy "Allow insert access" on public.rooms
  for insert to authenticated, anon with check (true);
create policy "Allow update access" on public.rooms
  for update to authenticated, anon using (true);

-- Only allow realtime listening on public tables.
drop publication if exists supabase_realtime;
create publication supabase_realtime for table rooms;
