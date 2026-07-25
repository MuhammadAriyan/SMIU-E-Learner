import { NextPage } from 'next'
import Image from 'next/image'

interface Props {}

const Navbar: NextPage<Props> = ({}) => {
  
  return<nav className="bg-white text-white flex justify-between items-center">
    <Image src="/logo.jpg" alt="Logo" width={100} height={50} />
  </nav>
}

export default Navbar