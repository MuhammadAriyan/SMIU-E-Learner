import ConfigCard from '@/components/configCard'
import Myplace from '@/components/myplace'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

interface Props {}

async function Page(){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if(!user)redirect('/login')

  const hasKey = process.env.API_KEY === undefined && process.env.API_KEY !== ''
  const hasBaseURL = process.env.BASE_URL !== undefined && process.env.BASE_URL !== ''
  const hasModel = process.env.MODEL !== undefined && process.env.MODEL !== ''
  
  const isEnvSet = hasKey && hasBaseURL && hasModel

  return (isEnvSet ? <Myplace/> : <ConfigCard/>)
}

export default Page