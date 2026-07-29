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