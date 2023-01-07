create policy "Allow delete access" on public.rooms
  for delete to authenticated using (
    auth.uid() in (
      select user_id from room_users
      where room_id = rooms.id
    )
  );

-- Add "on delete cascade" to foreign keys
alter table public.room_users
  drop constraint room_users_room_id_fkey,
  add constraint room_users_room_id_fkey
    foreign key (room_id)
    references public.rooms(id)
    on delete cascade;

alter table public.room_users
  drop constraint room_users_user_id_fkey,
  add constraint room_users_user_id_fkey
    foreign key (user_id)
    references auth.users(id)
    on delete cascade;
