'use server'

import { createClient } from '@/utils/supabase/server'

export async function addBook(formData: {
  title: string
  author?: string
  code?: string
  subject?: string
  file_url?: string
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: profile } = await supabase
    .from('profile')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!profile || !['admin', 'teacher', 'super_student'].includes(profile.role)) {
    return { error: 'Not authorized to add books' }
  }

  const { data, error } = await supabase
    .from('books')
    .insert(formData)
    .select()
    .single()

  if (error) return { error: error.message }
  return { data }
}