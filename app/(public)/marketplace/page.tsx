import { LibraryBigIcon, SearchIcon } from 'lucide-react'
import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div className='min-h-full'>
    <div className="bg-white/90 shadow-2xs  m-2 p-6 md:text-3xl rounded-lg backdrop-blur-md flex items-center gap-1 "><LibraryBigIcon/>Library</div>
    <div className="bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md">
    <form role='search' className='shadow-sm flex items-center p-2 rounded-2xl gap-5'>
        <SearchIcon className='text-black/60 m-3'/>
        <input type="text" name="" id="" className='w-full h-10  focus:outline-0 ' />
    </form>
    <div className="flex pt-2 px-2 gap-1 items-center">
    </div>
    </div>
  </div>
}

export default Page