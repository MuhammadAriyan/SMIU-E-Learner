'use client'
import { NextPage } from 'next'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const supabase = createClient()
  const [name, setName] = useState<string | null>(null)

  useEffect(()=>{
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if(user){
        const { data, error } = await supabase.from('profile').select('full_name').eq('user_id', user.id).single()
        console.log(data)
        console.log(error)
        if(data){
          setName(data.full_name)
        }
      }
    }
    getUser()
  },[])
  return <div className='chat h-screen w-screen p-3'>
    <div className="bg-white/90 m-2 p-6 md:text-2xl rounded-lg backdrop-blur-md ">Dashboard</div>
    <div className="bg-white/90 m-2 p-4 rounded-lg backdrop-blur-md ">
    <div className="m-2 md:text-2xl rounded-lg ">Hey {name}</div>
    </div>
  </div>
}

export default Page