'use client'
import { NextPage } from 'next'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, LayoutDashboard, MoveLeft } from 'lucide-react'
import Image from 'next/image'
import Avatar from '@/components/avatar'
interface Props {}
interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;          // used to construct the cover URL
  coverUrl: string;      // full URL to the cover image
}
interface Profile {
  user_id: string
  full_name: string
  role: string
  created_at: string
  avatar_url: string
}

const Page: NextPage<Props> = ({}) => {
  const supabase = createClient()
  const [name, setName] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [showAll, setShowAll] = useState<boolean>(false)
  const [profileShowAll, setProfileShowAll] = useState<boolean>(false)
  const [readMode,setReadMode] = useState<boolean>(false)
  const [profiles,setProfiles] = useState<Profile[]>([])
  // Define the type for a book

// Array of programming books with cover URLs
const dummyBooks:Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    isbn: '9780201616224',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg',
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    isbn: '9780596517748',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg',
  },
  {
    id: 4,
    title: "You Don't Know JS: Up & Going",
    author: 'Kyle Simpson',
    isbn: '9781491924464',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781491924464-L.jpg',
  },
  {
    id: 5,
    title: 'Introduction to Algorithms',
    author: 'Cormen, Leiserson, Rivest, Stein',
    isbn: '9780262046305',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262046305-L.jpg',
  },
  {
    id: 6,
    title: 'Design Patterns',
    author: 'Erich Gamma et al.',
    isbn: '9780201633610',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg',
  },
  {
    id: 7,
    title: 'The Mythical Man-Month',
    author: 'Frederick P. Brooks Jr.',
    isbn: '9780201835953',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201835953-L.jpg',
  },
  {
    id: 8,
    title: 'Refactoring',
    author: 'Martin Fowler',
    isbn: '9780201485677',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201485677-L.jpg',
  },
  {
    id: 9,
    title: 'Code Complete',
    author: 'Steve McConnell',
    isbn: '9780735619678',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735619678-L.jpg',
  },
  {
    id: 10,
    title: 'Structure and Interpretation of Computer Programs',
    author: 'Abelson & Sussman',
    isbn: '9780262510875',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262510875-L.jpg',
  }, 
  {
    id: 11,
    title: 'The Clean Coder',
    author: 'Robert C. Martin',
    isbn: '9780137081073',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780137081073-L.jpg',
  },
  {
    id: 12,
    title: 'Working Effectively with Legacy Code',
    author: 'Michael Feathers',
    isbn: '9780131177055',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780131177055-L.jpg',
  },
  {
    id: 13,
    title: 'Domain-Driven Design',
    author: 'Eric Evans',
    isbn: '9780321125217',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321125217-L.jpg',
  },
  {
    id: 14,
    title: 'Effective Java',
    author: 'Joshua Bloch',
    isbn: '9780134685991',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg',
  },
  {
    id: 15,
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    isbn: '9780984782857',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780984782857-L.jpg',
  },
  {
    id: 16,
    title: 'Eloquent JavaScript',
    author: 'Marijn Haverbeke',
    isbn: '9781593279509',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg',
  },
  {
    id: 17,
    title: 'The Art of Computer Programming, Vol. 1',
    author: 'Donald E. Knuth',
    isbn: '9780201896831',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201896831-L.jpg',
  },
  {
    id: 18,
    title: 'Continuous Delivery',
    author: 'Jez Humble & David Farley',
    isbn: '9780321601919',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321601919-L.jpg',
  },
]
  useEffect(()=>{
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if(user){
        const { data, error } = await supabase.from('profile').select().eq('user_id', user.id).single()
        
        console.log(data)
        console.log(error)
        if(data){
          setName(data.full_name)
          setRole(data.role)
          if(data.role === 'admin'){
            setColor('6B0F1A')
          }else if(data.role === 'teacher'){
            setColor('31081F')
          } else if(data.role === 'super_student'){
            setColor('0CBABA')
          }else {
            setColor('2E86AB')
          }
        }
      }
    }
    getUser()
  },[])

  useEffect(()=>{
    async function fetchAllUser(){
     const { data: profiles, error } = await supabase
  .from('profile')
  .select('*'); 
  console.log(profiles)
  console.log(error)
  if(profiles)setProfiles(profiles)}
    fetchAllUser()
  },[])

  const visibleBooks = showAll ? dummyBooks : dummyBooks.slice(0, 6)

  return <div className='h-screen w-screen p-3 text-xl  bg-[#f1f1f1]/30 '>
    {!readMode ?
    <div className="">
    <div className="bg-white/90 shadow-2xs  m-2 p-6 md:text-3xl rounded-lg backdrop-blur-md flex items-center gap-1 "><LayoutDashboard/>Dashboard</div>
    <div className="bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md ">
    
    <div className="flex pt-2 px-2 gap-1 items-center">
      <Avatar className='size-14 mr-2 shadow-2xs'/>
      <div className=" animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-2xl">Hey, </div>
      {name && (
        <div className="font-bold rounded-lg animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-2xl">
        {name}
        </div>
      )}{
        color && (
          <div className={`ml-2 px-2 py-1 text-sm font-bold rounded-lg text-white animate-[fadeIn_1s_ease-in-out] transition-all duration-1000`} style={{backgroundColor:`#${color}`}}>
            {role}
          </div>
        ) 
      }
    </div>
    <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-lg px-2">
      Welcome to your dashboard! Here you can manage your account, view your progress, and access exclusive content tailored to your role. Explore the features available to you and make the most of your experience.
    </div>

    </div>

    
    <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-lg px-5 bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md ">
        <h2>Your Books</h2>
        <div className="grid grid-cols-3">
          {visibleBooks.map((book,index)=>(
            <div 
            className="flex gap-3 items-center p-1 animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 " 
            key={index} onClick={()=>setReadMode(!readMode)}>
              <Image src={book.coverUrl} alt={`${book.title} cover`} width={30} height={30} className='rounded-xs'/>{book.title}</div>
          ))
          }
          </div>
          { dummyBooks.length > 6 &&  <button className='flex justify-center w-screen ' onClick={()=>setShowAll(!showAll)}>
            {showAll ? <ChevronUp className='bg-black rounded-4xl text-white/80'/>:<ChevronDown className='bg-black rounded-4xl text-white/80'/>}
            </button>}
      </div>
      

      <div className="">
    <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-lg px-5 bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md ">
        <h2>Profile</h2>
        <div className="grid grid-cols-3">
          {profiles && profiles.map((profile,index)=>(
            <div 
            className="flex gap-3 items-center p-1 animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 " 
            key={index} >
              <Image src={ profile.avatar_url } alt={`${profile} avatar`} width={30} height={30} className='rounded-4xl'/>
              {profile.full_name}</div>
          ))
          }
          </div>
          { profiles.length > 6 &&  <button className='flex justify-center w-screen ' onClick={()=>setProfileShowAll(!profileShowAll)}>
            {profileShowAll ? <ChevronUp className='bg-black rounded-4xl text-white/80'/>:<ChevronDown className='bg-black rounded-4xl text-white/80'/>}
            </button>}
      </div></div>
      </div>
      :
      <div className='h-screen w-screen animate-[fadeIn_1s_ease-in-out] transition-all px-5 bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md '>
        <div className='flex items-center' onClick={()=>setReadMode(!readMode)}>
          <MoveLeft className='m-2 p-1 text-white bg-black rounded-2xl'/>
          Back
          </div>
        <iframe src='http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf'  className='h-full w-full'></iframe>
        </div>}
  </div>}
export default Page 