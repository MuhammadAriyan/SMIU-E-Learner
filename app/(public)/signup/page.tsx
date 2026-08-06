'use client'
import { createClient } from '@/utils/supabase/client'
import { Target } from 'lucide-react'
import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect,useRef, useState } from 'react' 

interface Props {} 

const SignUp: NextPage<Props> = ({}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

    const video= useRef<HTMLVideoElement>(null)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
    if (video.current) {
        video.current.playbackRate = 0.5;
      }
    }, []);

    async function handleSignup(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      if(confirmPassword!=password) {setError('Passwords do not match'); return}
      if(name =='') {setError('No Name Provided'); return}
      if(email =='') {setError('No Email Provided'); return}
      if(password =='') {setError('No Password Provided'); return}
      if(confirmPassword!=password) {setError('Passwords do not match'); return}

      setLoading(true)

      const result =await supabase.auth.signUp({
        email,
        password,
        options:{
          data:{
            full_name:name
          }
        }
      })
      if(result.error){
        setError(result.error.message)
        setLoading(false)
        return
      }
      router.push('/login')   
    }
    async function googleSignup() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    }

    return <main className="flex justify-center items-center" >
      <video ref={video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
    <source src="/home/bg-desktop.mp4" type="video/mp4"/>
  </video>
  <div className="flex items-center justify-center h-full w-full ">
     <div className=" mt-10 sm:mt-20 sm:w-1/2 gap-3 bg-white   flex flex-col items-center justify-center rounded-4xl p-8 focus-within:outline-none">
    <div className="text-3xl text-black/80 mt-4">Sign Up</div>
    <div className="text-xl text-black/80 mt-4">Create your account</div>
  <span className='text-red-500 bg-red-500/10 p-2 rounded-xl'>{error}</span> 
    <form className="flex flex-col items-center justify-center mt-4 w-full" onSubmit={handleSignup}>
      <input 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      type="text" 
      placeholder="Name" 
      className="p-2  w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <input 
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      type="text"
      placeholder="Email"
      className="p-2  w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <input 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      type="password"
      placeholder="Password" 
      className="p-2 w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <input 
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}
      type="password" 
      placeholder="Confirm Password" 
      className="p-2 w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <button 
      type='submit'
      className="border hover:border-black hover:bg-transparent bg-black  p-2 rounded-4xl w-64 hover:text-black/80 text-white transition duration-300">
        {loading ? 'Signing up':'SignUp'}
        </button>
    </form>
    <button
    onClick={googleSignup}
    className="border hover:bg-black/10 flex items-center justify-center bg-white  p-2 rounded-4xl w-64 hover:text-black/80 transition duration-300">
            <Image src={'https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png'} width={1000} height={1000} className='h-6 w-6' alt='Google'/>
      </button>
    <div className=" mt-4">Already have an account? <a href="/login" className="text-black/60 hover:text-black transition duration-300">Login</a></div>
    </div>
  </div>
  </main>
}

export default SignUp