import Myplace from '@/components/myplace'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface Props {}

async function Page(){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user)redirect('/login')
  return <Myplace/>
}

export default Page