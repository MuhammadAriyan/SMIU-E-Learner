"use server"
import { createClient } from '@/utils/supabase/server'


export async function setConfig(API_KEY: string, BASE_URL: string, MODEL: string){

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if(!user) throw new Error('User not authenticated')

    if(!API_KEY || !BASE_URL || !MODEL) throw new Error('All fields are required')
    const {error} = await supabase.from('user_settings').upsert({
    user_id: API_KEY,
    base_url: BASE_URL ,
    model: MODEL
    })
    if(error) throw new Error('Error updating user configuration')
  }