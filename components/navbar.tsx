import { NextPage } from 'next'
import Image from 'next/image'

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  
  return<nav className="bg-[#f0f7f5]/70  backdrop-blur-3xl flex justify-between items-center">
    <a href="/" className="">
    <Image src="/transparent-logo.png" alt="Logo" width={100} height={50}/>
    </a>
    <ul className="flex space-x-4 mr-2">
      <li><a href="/" className="text-black/80 hover:text-black/50  transition duration-300">Home</a></li>
      <li><a href="/login" className="text-black/80 hover:text-black/50  transition duration-300">Login</a></li>
      <li><a href="/signup" className="text-black/80 hover:text-black/50  transition duration-300">Sign Up</a></li>
    </ul>
  </nav>
}

export default Navbar