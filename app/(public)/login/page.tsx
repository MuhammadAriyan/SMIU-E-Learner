'use client'
import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect,useRef } from 'react'
interface Props {}

const Login: NextPage<Props> = ({}) => {
      const video= useRef<HTMLVideoElement>(null)
    useEffect(() => {
      if (video.current) {
        video.current.playbackRate = 0.5;
      }
    }, []);
    return <main className="flex justify-center items-center " >
      <video ref={video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
    <source src="/home/bg-desktop.mp4" type="video/mp4"/>
  </video>
  <div className="flex items-center justify-center h-full w-full ">
     {/* <Image src="/login/sidepanel.jpg" alt="" width={1000} height={150} className="w-1/2"/> */}
     <div className="  mt-4 bg-white flex flex-col items-center justify-center rounded-4xl p-8">
    <div className="text-3xl text-black/80 mt-4">Welcome Back!</div>
    <div className="-2xl text-black/80 mt-4">Login to your account</div>
    <form className="flex flex-col items-center justify-center mt-4">
      <input type="text" placeholder="Email" className="p-2 rounded-4xl w-64 mb-4"/>
      <input type="password" placeholder="Password" className="p-2 rounded-4xl w-64 mb-4"/>
      <button className="bg-blue-500 hover:bg-blue-600 hover:text-white/90  p-2 rounded-4xl w-64 text-white/80">Login</button>
    </form>
    <div className=" mt-4">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></div>
    </div>
  </div>
  </main>
}

export default Login