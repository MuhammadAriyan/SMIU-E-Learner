import Myplace from '@/components/myplace'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

async function Page(){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user)redirect('/login')
    
  const avatarUrl = user?.user_metadata?.avatar_url ?? user?.user_metadata?.picture ?? null

  if (avatarUrl) {
  const { error: avatarError } = await supabase
    .from('profile')
    .update({ avatar_url: avatarUrl })
    .eq('user_id', user.id) .neq('avatar_url', avatarUrl) // skip write if already in sync
    if (avatarError) {
  console.error('avatar update failed:', {
    message: avatarError.message,
    code: avatarError.code,
    details: avatarError.details,
    hint: avatarError.hint,
  })
}
     
  if (avatarError) console.error('avatar update failed:', avatarError)
} 
  const hasKey = process.env.API_KEY !== undefined && process.env.API_KEY !== ''
  const hasBaseURL = process.env.BASE_URL !== undefined && process.env.BASE_URL !== ''
  const hasModel = process.env.MODEL !== undefined && process.env.MODEL !== ''
  const  settings   = await supabase.from('user_settings').select('api_key, base_url, model').eq('user_id', user.id).maybeSingle()
  const isEnvSet =  settings.data?.api_key && settings.data?.base_url && settings.data?.model || (hasKey && hasBaseURL && hasModel)
  
  if(!isEnvSet){
    redirect('/configCard')
  }
  return (<Myplace/>)
}

export default Page