CREATE table user_settings (
    user_id uuid references auth.users(id) primary key,
    api_key text not null,
    base_url text not null,
    model text not null,
    created_at timestamptz default now() not null
);

alter table user_settings enable row level security;


grant select, insert, update on public.user_settings to authenticated;

drop policy if exists "Users can view their own settings" on user_settings;

create policy "Users can view their own settings" on user_settings
for select using (auth.uid() = user_id);

drop policy if exists "Users can update their own settings" on user_settings;

create policy "Users can update their own settings" on user_settings
for update using (auth.uid() = user_id);

drop policy if exists "Users can insert their own settings" on user_settings;

create policy "Users can insert their own settings" on user_settings
for insert
with check (auth.uid() = user_id);