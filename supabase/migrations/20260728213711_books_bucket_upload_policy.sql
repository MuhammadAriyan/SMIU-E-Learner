drop policy if exists "Only admins,teacher and super_student can upload books" on books;
create policy "Only admins,teacher and super_student can upload books"
on storage.objects for insert
with check(
    bucket_id = 'books' and
    exists (
        select 1 from profile
        where profile.user_id = auth.uid()
        and profile.role in ('admin', 'teacher', 'super_student')
    )
);