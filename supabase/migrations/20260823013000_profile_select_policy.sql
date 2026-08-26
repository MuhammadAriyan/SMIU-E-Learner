-- Allow authenticated users to select their own profile row
-- This is needed for the books insert RLS policy's subquery to work
drop policy if exists "Authenticated users can view their own profile" on profile;
create policy "Authenticated users can view their own profile"
on profile for select
to authenticated
using (auth.uid() = user_id);
