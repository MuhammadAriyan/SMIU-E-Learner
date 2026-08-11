alter table profile add column if not exists avatar_url text default '/placeholder.jpg';

update profile p
set avatar_url = coalesce(
  u.raw_user_meta_data->>'avatar_url',
  u.raw_user_meta_data->>'picture',
  '/placeholder.jpg'
)
from auth.users u
where p.user_id = u.id;