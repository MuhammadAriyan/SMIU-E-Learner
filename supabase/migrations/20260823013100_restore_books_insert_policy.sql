-- Restore the missing INSERT policy for books table
drop policy if exists "Only admins,teacher and super_student can insert books" on books;
create policy "Only admins,teacher and super_student can insert books"
on books for insert
to authenticated with check(
    exists (
        select 1 from profile
        where profile.user_id = auth.uid()
        and profile.role in ('admin', 'teacher', 'super_student')
    )
);
