drop policy if exists "Only admins,teacher and super_student can insert books" on books;
create policy "Only admins,teacher and super_student can insert books"
on books for insert
to authenticated with check(
    public.get_user_role(auth.uid()) in ('admin', 'teacher', 'super_student')
);

drop policy if exists "Only admins,teacher and super_student can delete books" on books;
create policy "Only admins,teacher and super_student can delete books"
on books for delete
to authenticated using (
    public.get_user_role(auth.uid()) in ('admin', 'teacher', 'super_student')
);