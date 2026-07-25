'use client'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect,useRef } from 'react'
interface Props {}

const SignUp: NextPage<Props> = ({}) => {
      const video= useRef<HTMLVideoElement>(null)
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
     <div className=" mt-10 sm:mt-20 sm:w-1/2 bg-white   flex flex-col items-center justify-center rounded-4xl p-8 focus-within:outline-none">
    <div className="text-3xl text-black/80 mt-4">Sign Up</div>
    <div className="text-xl text-black/80 mt-4">Create your account</div>
    <form className="flex flex-col items-center justify-center mt-4 w-full">
      <input type="text" placeholder="Name" className="p-2  w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <input type="text" placeholder="Email" className="p-2  w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <input type="password" placeholder="Password" className="p-2 w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <input type="password" placeholder="Confirm Password" className="p-2 w-full sm:w-1/2 mb-4 rounded-2xl border border-black/10 shadow-[0px_8px_20px_-8px_rgba(0,0,0,0.15)] focus-within:outline-none"/>
      <button className="border hover:border-black hover:bg-transparent bg-black  p-2 rounded-4xl w-64 hover:text-black/80 text-white transition duration-300">SignUp</button>
    </form>
    <div className=" mt-4">Already have an account? <a href="/login" className="text-black/60 hover:text-black transition duration-300">Login</a></div>
    </div>
  </div>
  </main>
}

export default SignUp