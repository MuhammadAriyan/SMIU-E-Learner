'use client'
import { NextPage } from 'next'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const supabase = createClient()
  const [name, setName] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  useEffect(()=>{
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if(user){
        const { data, error } = await supabase.from('profile').select().eq('user_id', user.id).single()
        console.log(data)
        console.log(error)
        if(data){
          setName(data.full_name)
          setRole(data.role)
          if(data.role === 'admin'){
            setColor('6B0F1A')
          }else if(data.role === 'teacher'){
            setColor('31081F')
          } else if(data.role === 'super_student'){
            setColor('0CBABA')
          }else {
            setColor('2E86AB')
          }
        }
      }
    }
    getUser()
  },[])
  return <div className='h-screen w-screen p-3 text-xl  bg-[#f1f1f1]/30 '>
    <div className="bg-white/90 shadow-2xs  m-2 p-6 md:text-3xl rounded-lg backdrop-blur-md ">Dashboard</div>
    <div className="bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md ">
    
    <div className="flex p-2 gap-1 items-center">
      <div className=" animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-2xl">Hey, </div>
      {name && (
        <div className="font-bold rounded-lg animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-2xl">
        {name}
        </div>
      )}{
        color && (
          <div className={`ml-2 px-2 py-1 text-sm font-bold rounded-lg text-white animate-[fadeIn_1s_ease-in-out] transition-all duration-1000`} style={{backgroundColor:`#${color}`}}>
            {role}
          </div>
        ) 
      }
    </div>

    </div>
    
  </div>
}

export default Page