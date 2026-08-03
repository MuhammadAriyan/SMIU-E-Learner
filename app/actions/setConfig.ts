"use server"
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export async function setConfig(API_KEY: string, BASE_URL: string, MODEL: string){

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if(!user) throw new Error('User not authenticated')

    if(!API_KEY || !BASE_URL || !MODEL) throw new Error('All fields are required')
    const {error} = await supabase.from('user_settings').upsert({
    user_id: user.id,
    api_key: API_KEY,
    base_url: BASE_URL ,
    model: MODEL
    })
    console.log(error)
    if(error) throw new Error('Error updating user configuration')
    redirect('/myplace')
  }