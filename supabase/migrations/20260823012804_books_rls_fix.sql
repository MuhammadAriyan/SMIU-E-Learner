create or replace function public.get_user_role(uid uuid)
returns text
language sql
security definer
stable
set search_path = public
as $$
  select role from profile where user_id = uid;
$$;
drop policy if exists "Admins can view all profiles" on profile;
create policy "Admins can view all profiles"
on profile for select
to authenticated
using (
  user_id = auth.uid()
  or public.get_user_role(auth.uid()) = 'admin'
);