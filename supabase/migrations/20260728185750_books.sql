CREATE table books  (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    author text default 'unknown',
    code text,
    subject text,
    file_url text,
    created_at timestamptz default now()
);

alter table books enable row level security;

drop policy if exists "Anyone can view books" on books;

create policy "Anyone can view books"
on books for select
using(true);


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


drop policy if exists "Only admins,teacher and super_student can delete books" on books;
create policy "Only admins,teacher and super_student can delete books"
on books for delete
to authenticated
using (
  exists (
    select 1 from profile
    where profile.user_id = auth.uid()
    and profile.role in ('admin', 'teacher', 'super_student')
  )
);