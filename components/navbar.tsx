import { NextPage } from 'next'
import Image from 'next/image'

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  
  return<nav className="bg-white text-white flex justify-between items-center">
    <Image src="/logo.jpg" alt="Logo" width={100} height={50} />
    <ul className="flex space-x-4 mr-2">
      <li><a href="/" className="text-black/80 hover:text-black/50">Home</a></li>
      <li><a href="/login" className="text-black/80 hover:text-black/50">Login</a></li>
      <li><a href="/signup" className="text-black/80 hover:text-black/50">Sign Up</a></li>
    </ul>
  </nav>
}

export default Navbar