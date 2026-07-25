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
  return <main className="flex justify-center" >
    <video ref={video} autoPlay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
  <source src="/home/bg-desktop.mp4" type="video/mp4"/>
</video>
<div className=" rounded-4xl mt-36 text-shadow-2xs flex flex-col items-center justify-center hero">
      {/* <Image src="/logo.jpg" alt="" width={150} height={150} className="mx-auto rounded-full"/> */}
      <h2 className="pt-6 font-extrabold text-4xl tracking-wider text-white w-full text-center">SMIU </h2>
      <h2 className="p-8 text-6xl text-white pt-0 text-shadow">E-LEARNER</h2>
      <span className="text-white text-2xl text-center leading-none">SMIU E-Learning Website with all the resources and a tutor</span>
      <span className="text-white text-2xl text-center w-xl leading-6 ">E-Learning Platform for SMIU students with all the preparation papers, e-books and AI - Tutor </span>
    </div>
  </main>
}

export default Page