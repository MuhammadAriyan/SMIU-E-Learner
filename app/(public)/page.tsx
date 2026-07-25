'use client'
import { NextPage } from 'next'
import { useEffect,useRef } from 'react'
import Image from 'next/image'
interface Props {}

const Page: NextPage<Props> = ({}) => {

    const video= useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (video.current) {
      video.current.playbackRate = 0.5;
    }
  }, []);
  return <main className="flex justify-center overflow-x-hidden overflow-y-hidden " >
    <video ref={video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
  <source src="/home/bg-desktop.mp4" type="video/mp4"/>
</video>
<div className="mt-36 text-shadow-2xs flex flex-col items-center justify-center hero  p-10 w-full h-full ">
      {/* <Image src="/logo.jpg" alt="" width={150} height={150} className="mx-auto rounded-full"/> */}
      <h2 className="pt-6 font-extrabold text-4xl tracking-wider text-white w-full text-center shadow-amber-900">SMIU </h2>
      <h2 className="p-8 text-6xl text-white pt-0  ">E-LEARNER</h2>
      <span className="text-white text-lg sm:text-2xl wrap-break-word  text-center leading-none" >SMIU E-Learning Website with all the resources and a tutor</span>
      <span className="text-white text-lg sm:text-2xl text-center  sm:w-xl wrap-break-words leading-6  ">E-Learning Platform for SMIU students with all the preparation papers, e-books and AI - Tutor </span>
    <button className="bg-white text-black p-4 px-6 mt-2 rounded-4xl  transition duration-300" onClick={() => window.location.href = '/login'}>Get Started</button>
    </div>  
  </main>
}

export default Page