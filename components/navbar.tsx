'use client'
import { createClient } from '@/utils/supabase/client'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {User} from   '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const router = useRouter()
  const supabase = createClient()
  const [user,setUser] = useState<User|null>(null)
  useEffect(()=>{
    supabase.auth.getUser().then((response)=>{setUser(response.data.user)})
    console.log(user)
  },[])

  async function logout(){
    const {error} = await supabase.auth.signOut()
    if(error){console.error('logout failed');return}
    router.push('/login')
    router.refresh()
  }
    
  return<nav className="bg-white/90 backdrop-blur-3xl flex justify-between items-center">
    <a href="/" className="">
    <Image src="/transparent-logo.png" alt="Logo" width={100} height={50}/>
    </a>
    <ul className="flex space-x-4 mr-2">
      <li><a href="/" className="text-black/80 hover:text-black/50  transition duration-300">Home</a></li>
      {user ?(
      <div className="flex gap-3">
      <li><a href="/myplace" className="text-black/80 hover:text-black/50  transition duration-300">My Place</a></li>
        <li>{user.email}</li>
        <li onClick={logout}>Log Out</li>
      </div>)
      :
      (<div className="flex gap-2">
      <li><a href="/login" className="text-black/80 hover:text-black/50  transition duration-300">Login</a></li>
      <li><a href="/signup" className="text-black/80 hover:text-black/50  transition duration-300">Sign Up</a></li>:
      </div>
      )}
    </ul>
  </nav> 
}

export default Navbar