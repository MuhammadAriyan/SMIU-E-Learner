'use client'
import { createClient } from '@/utils/supabase/client'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect,useRef,useState } from 'react'

interface Props {}

const Login: NextPage<Props> = ({}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const video= useRef<HTMLVideoElement>(null)

  const router = useRouter()

  const supabase = createClient()

  async function handleLogin(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()

    if(password =='') {setError('No Password Provided'); return}
    if(email =='') {setError('No Email Provided'); return}
    
    setError('')
    setLoading(true)
    const result = await supabase.auth.signInWithPassword({email,password})

    setLoading(false)

    if (result.error){
      setError(result.error.message)
      return
    }
    router.push('/myplace')
    router.refresh()
  }

  async function googleLogin() {
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{
        redirectTo : `${window.location.origin}/auth/callback`
      }
    })
  }

  useEffect(() => {
      if (video.current) {
        video.current.playbackRate = 0.5;
      }
    }, []);
  return <main className="flex justify-center items-center" >
      <video ref={video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
    <source src="/home/bg-desktop.mp4" type="video/mp4"/>
  </video>
  <div className="flex items-center justify-center h-full w-full ">
     {/* <Image src="/login/sidepanel.jpg" alt="" width={1000} height={150} className="w-1/2"/> */}
     <div className=" mt-10 gap-3 sm:mt-20 sm:w-1/2 bg-white   flex flex-col items-center justify-center rounded-4xl p-8 focus-within:outline-none">
    <div className="text-3xl text-black/80 mt-4">Welcome Back!</div>
    <div className="-2xl text-black/80 mt-4">Login to your account</div>  
    <span className='text-red-500 bg-red-500/10 p-2 rounded-xl'>{error}</span> 
    <form className="flex flex-col items-center justify-center mt-4 w-full" onSubmit={handleLogin}>
      <input type="text" 
      placeholder="Email" 
      className="p-2 w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password"
      placeholder="Password"
      className="p-2 w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
      <button
      type='submit'
      className="border hover:border-black hover:bg-transparent bg-black  p-2 rounded-4xl w-64 hover:text-black/80 text-white transition duration-300">
        {loading ? 'Logging in': 'Login'}
        </button>
    </form>
      <button 
      onClick={googleLogin}
      className="border hover:bg-black/10 flex items-center justify-center bg-white  p-2 rounded-4xl w-64 hover:text-black/80 transition duration-300">
      <Image src={'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'} width={1000} height={1000} className='h-6 w-6' alt='Google'/>
      </button>
    <div className=" mt-4">Don't have an account? <a href="/signup" className="text-black/60 hover:text-black transition duration-300">Sign Up</a></div>
    </div>
  </div>
</main>
}

export default Login