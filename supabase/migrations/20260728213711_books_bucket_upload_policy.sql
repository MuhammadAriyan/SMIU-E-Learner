create policy "Authenticated users can upload books"
on storage.objects for insert
with check(
    bucket_id = 'books'
    and auth.role() = 'authenticated'
);