'use client'
import { createClient } from '@/utils/supabase/client'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter} from 'next/navigation'
import { LogOutIcon, SettingsIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import Avatar from './avatar'
interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  const router = useRouter()
  const [user,setUser] = useState<User | null>(null)
  const [showSettings,setShowSettings] = useState(false)
  const supabase = createClient()
  
  useEffect(()=>{
    async function getUser(){
    const  { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    } 
    getUser()
  },[])
  async function userSettings(){
    setShowSettings(!showSettings)
  } 
  if(showSettings){
    redirect('/configCard')
  }

  async function logout(){
    const {error} = await supabase.auth.signOut()
    if(error){console.error('logout failed');return}
    router.push('/login')
    router.refresh()
  }
  return<nav className="bg-white/90 backdrop-blur-3xl flex z-10 justify-between items-center">
    <a href="/" className="">
    <Image src="/transparent-logo.png" alt="Logo" width={100} height={50}/>
    </a>
    <ul className="flex space-x-4 mr-2 items-center">
      <li><a href="/" className="text-black/80 hover:text-black/50  transition duration-300">Home</a></li>
      {user ?(
      <div className="flex gap-3 justify-center items-center">
      <li><a href="/myplace" className="text-black/80 hover:text-black/50  transition duration-300">My Place</a></li>
      <li><a href="/dashboard" className="text-black/80 hover:text-black/50  transition duration-300">Dashboard</a></li>
        <li>{user.email}</li>
        <Avatar className='size-8'/>
         <li onClick={userSettings}>
          <SettingsIcon className='size-5 '/>
        </li>
        <li onClick={logout}>
          <LogOutIcon className='size-5 '/>
        </li>
      </div>)
      :
      (<div className="flex gap-2">
      <li><a href="/login" className="text-black/80 hover:text-black/50  transition duration-300">Login</a></li>
      <li><a href="/signup" className="text-black/80 hover:text-black/50  transition duration-300">Sign Up</a></li>
      </div>
      )}
    </ul>
  </nav> 
}

export default Navbar