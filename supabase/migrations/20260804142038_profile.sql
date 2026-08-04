create table profile (
    user_id uuid references auth.users(id) primary key ,
    full_name text not null,
    role text not null default 'student' check (role in ('student','super_student', 'teacher', 'admin')),
    created_at timestamptz default now() not null
);

alter table profile enable row level security;

create policy "Users can view their own profile" on profile
for select using (auth.uid() = user_id);

create policy "Users can update their own profile" on profile
for update using (auth.uid() = user_id)
with check (
    auth.uid() = user_id
    and role = (select role from profile where user_id = auth.uid())    
);


create or replace function handle_new_user() 
returns trigger as $$
begin
    insert into public.profile (user_id,full_name)
    values (new.id, new.raw_user_meta_data->>'full_name');
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users  
for each row execute function handle_new_user();   


create policy "Admins can view all profiles" on profile
for select
to authenticated
using (
  exists (
    select 1 from profile p
    where p.user_id = auth.uid() and p.role = 'admin'
  )
);

create policy "Admins can update all profiles"
on profile for update
to authenticated
using (exists (select 1 from profile where user_id = auth.uid() and role = 'admin'))
with check (true);

create policy "Admins can delete profiles"
on profile for delete
to authenticated
using (exists (select 1 from profile where user_id = auth.uid() and role = 'admin'));