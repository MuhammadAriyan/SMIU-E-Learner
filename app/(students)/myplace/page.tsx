import Myplace from '@/components/myplace'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface Props {}

async function Page(){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user)redirect('/login')

  
  const hasKey = process.env.API_KEY !== undefined && process.env.API_KEY !== ''
  const hasBaseURL = process.env.BASE_URL !== undefined && process.env.BASE_URL !== ''
  const hasModel = process.env.MODEL !== undefined && process.env.MODEL !== ''
  const  settings   = await supabase.from('user_settings').select('api_key, base_url, model').eq('user_id', user.id).maybeSingle()
  const isEnvSet =  settings.data?.api_key && settings.data?.base_url && settings.data?.model
  
  if(!isEnvSet){
    redirect('/configCard')
  }
  return (<Myplace/>)
}

export default Page