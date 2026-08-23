'use client'
import { NextPage } from 'next'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, FileUpIcon, LayoutDashboard, MoveLeft } from 'lucide-react'
import Image from 'next/image'
import Avatar from '@/components/avatar'

interface Props {}

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;          // used to construct the cover URL
  coverUrl: string;      // full URL to the cover image
  fileUrl: string;       // full URL to the actual readable file (pdf/epub)
}

interface Profile {
  user_id: string
  full_name: string
  role: string
  created_at: string
  avatar_url: string
}

// roles allowed to upload books — same gate as app/books/page.tsx
const CAN_UPLOAD_ROLES = ['admin', 'teacher', 'super_student']

const Page: NextPage<Props> = ({}) => {
  const supabase = createClient()
  const [name, setName] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [showAll, setShowAll] = useState<boolean>(false)
  const [profileShowAll, setProfileShowAll] = useState<boolean>(false)
  const [readMode, setReadMode] = useState<boolean>(false)
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  // derived from role — mirrors canAddBooks in app/books/page.tsx
  const canAddBooks = CAN_UPLOAD_ROLES.includes(role ?? '')

  // Array of programming books with cover + file URLs
  const dummyBooks: Book[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 2, title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt', isbn: '9780201616224', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 3, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', isbn: '9780596517748', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780596517748-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 4, title: "You Don't Know JS: Up & Going", author: 'Kyle Simpson', isbn: '9781491924464', coverUrl: 'https://covers.openlibrary.org/b/isbn/9781491924464-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 5, title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', isbn: '9780262046305', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262046305-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 6, title: 'Design Patterns', author: 'Erich Gamma et al.', isbn: '9780201633610', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 7, title: 'The Mythical Man-Month', author: 'Frederick P. Brooks Jr.', isbn: '9780201835953', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201835953-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 8, title: 'Refactoring', author: 'Martin Fowler', isbn: '9780201485677', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201485677-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 9, title: 'Code Complete', author: 'Steve McConnell', isbn: '9780735619678', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735619678-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 10, title: 'Structure and Interpretation of Computer Programs', author: 'Abelson & Sussman', isbn: '9780262510875', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780262510875-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 11, title: 'The Clean Coder', author: 'Robert C. Martin', isbn: '9780137081073', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780137081073-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 12, title: 'Working Effectively with Legacy Code', author: 'Michael Feathers', isbn: '9780131177055', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780131177055-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 13, title: 'Domain-Driven Design', author: 'Eric Evans', isbn: '9780321125217', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321125217-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 14, title: 'Effective Java', author: 'Joshua Bloch', isbn: '9780134685991', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780134685991-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 15, title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell', isbn: '9780984782857', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780984782857-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 16, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', isbn: '9781593279509', coverUrl: 'https://covers.openlibrary.org/b/isbn/9781593279509-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 17, title: 'The Art of Computer Programming, Vol. 1', author: 'Donald E. Knuth', isbn: '9780201896831', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780201896831-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
    { id: 18, title: 'Continuous Delivery', author: 'Jez Humble & David Farley', isbn: '9780321601919', coverUrl: 'https://covers.openlibrary.org/b/isbn/9780321601919-L.jpg', fileUrl: 'http://www.uml.org.cn/c++/pdf/DesignPatterns.pdf' },
  ]

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // fixed: .single() -> .maybeSingle() so a missing profile row
        // doesn't throw, matching app/books/page.tsx
        const { data, error } = await supabase
          .from('profile')
          .select()
          .eq('user_id', user.id)
          .maybeSingle()

        if (error) console.error(error)
        if (data) {
          setName(data.full_name)
          setRole(data.role)
          if (data.role === 'admin') {
            setColor('6B0F1A')
          } else if (data.role === 'teacher') {
            setColor('31081F')
          } else if (data.role === 'super_student') {
            setColor('0CBABA')
          } else {
            setColor('2E86AB')
          }
        }
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    async function fetchAllUsers() {
      const { data: profiles, error } = await supabase
        .from('profile')
        .select('*')
      if (error) console.error(error)
      if (profiles) setProfiles(profiles)
    }
    fetchAllUsers()

    // realtime: keep the profiles list in sync as rows are inserted,
    // updated, or deleted — no polling, no manual refresh needed.
    // Requires the 'profile' table to have realtime enabled in Supabase
    // (Database > Replication) and an RLS select policy that allows it.
    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profile' },
        (payload) => {
          setProfiles((current) => {
            if (payload.eventType === 'INSERT') {
              const newRow = payload.new as Profile
              // avoid duplicates if the row somehow already exists
              if (current.some((p) => p.user_id === newRow.user_id)) return current
              return [...current, newRow]
            }
            if (payload.eventType === 'UPDATE') {
              const updated = payload.new as Profile
              return current.map((p) => (p.user_id === updated.user_id ? updated : p))
            }
            if (payload.eventType === 'DELETE') {
              const deleted = payload.old as Profile
              return current.filter((p) => p.user_id !== deleted.user_id)
            }
            return current
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const visibleBooks = showAll ? dummyBooks : dummyBooks.slice(0, 6)
  const isAdmin = role === 'admin'
  // non-admins are hard-capped at 6 and never see a way to expand —
  // profileShowAll can only ever take effect for admins.
  const visibleProfiles = isAdmin && profileShowAll ? profiles : profiles.slice(0, 6)

  const openBook = (book: Book) => {
    setSelectedBook(book)
    setReadMode(true)
  }

  const closeReader = () => {
    setReadMode(false)
    setSelectedBook(null)
  }

  return (
    <div className='h-screen w-screen p-3 text-xl bg-[#f1f1f1]/30'>
      {!readMode ? (
        <div className="">
          <div className="bg-white/90 shadow-2xs m-2 p-6 md:text-3xl rounded-lg backdrop-blur-md flex items-center gap-1">
            <LayoutDashboard />Dashboard
          </div>
          <div className="bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md">
            <div className="flex pt-2 px-2 gap-1 items-center">
              <Avatar className='size-14 mr-2 shadow-2xs' />
              <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-2xl">Hey, </div>
              {name && (
                <div className="font-bold rounded-lg animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-2xl">
                  {name}
                </div>
              )}
              {color && (
                <div
                  className='ml-2 px-2 py-1 text-sm font-bold rounded-lg text-white animate-[fadeIn_1s_ease-in-out] transition-all duration-1000'
                  style={{ backgroundColor: `#${color}` }}
                >
                  {role}
                </div>
              )}
            </div>
            <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-lg px-2">
              Welcome to your dashboard! Here you can manage your account, view your progress, and access exclusive content tailored to your role. Explore the features available to you and make the most of your experience.
            </div>
          </div>

          <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-lg px-5 bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md">
            <h2>Your Books</h2>
            <div className="grid grid-cols-3">
              {visibleBooks.map((book) => (
                <div
                  className="flex gap-3 items-center p-1 animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 cursor-pointer"
                  key={book.id}
                  onClick={() => openBook(book)}
                >
                  <Image src={book.coverUrl} alt={`${book.title} cover`} width={30} height={30} className='rounded-xs' />
                  {book.title}
                </div>
              ))}
            </div>
            {dummyBooks.length > 6 && (
              <button className='flex justify-center w-full' onClick={() => setShowAll(!showAll)}>
                {showAll ? <ChevronUp className='bg-black rounded-4xl text-white/80' /> : <ChevronDown className='bg-black rounded-4xl text-white/80' />}
              </button>
            )}
          </div>

          <div className="">
            <div className="animate-[fadeIn_1s_ease-in-out] transition-all duration-1000 text-lg px-5 bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md">
              <h2>Profile</h2>
              <div className="grid grid-cols-3">
                {visibleProfiles.map((profile) => (
                  <div
                    className="flex gap-3 items-center p-1 animate-[fadeIn_1s_ease-in-out] transition-all duration-1000"
                    key={profile.user_id}
                  >
                    <Image src={profile.avatar_url} alt={`${profile.full_name} avatar`} width={30} height={30} className='rounded-4xl' />
                    {profile.full_name}
                  </div>
                ))}
              </div>
              {isAdmin && profiles.length > 6 && (
                <button className='flex justify-center w-full' onClick={() => setProfileShowAll(!profileShowAll)}>
                  {profileShowAll ? <ChevronUp className='bg-black rounded-4xl text-white/80' /> : <ChevronDown className='bg-black rounded-4xl text-white/80' />}
                </button>
              )}
            </div>
          </div>

          {/* Upload Books — gated the same way as AddBookButton in app/books/page.tsx.
              role is null until the profile fetch resolves, so canAddBooks is
              false-by-default and only opens up once we know the role. */}
          {canAddBooks && (
            <div className="bg-white/90 m-2 p-4 rounded-lg shadow-2xs text-lg backdrop-blur-md px-5">
              <h2>Upload Books</h2>
              <form className='space-y-3' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="fileuploader"><FileUpIcon className='shadow-sm p-4 size-20 rounded-2xl' /></label>
                <input
                  type="file"
                  name="file"
                  id="fileuploader"
                  accept=".pdf,.epub,.mobi"
                  className='hidden'
                />
                <input type="text" name="title" className='py-1 mt-2 px-2 flex items-end focus:outline-0 shadow-sm rounded-xl' placeholder='Enter Book Title ' />
                <input type="text" name="subject" className='py-1 px-2 flex items-end focus:outline-0 shadow-sm rounded-xl' placeholder='Enter Subject ' />
                <input type="text" name="code" className='py-1 px-2 flex items-end focus:outline-0 shadow-sm rounded-xl' placeholder='Enter Code ' />
                <textarea rows={4} cols={50} name="description" placeholder="Description " className='py-1 px-2 flex items-end focus:outline-0 shadow-sm rounded-xl'></textarea>
                <input type="submit" value="Submit" className='text-white bg-black p-2 px-3 rounded-2xl w-[36%] hover:bg-black/80 transition-all duration-200' />
              </form>
            </div>
          )}
        </div>
      ) : (
        <div className='h-screen w-screen animate-[fadeIn_1s_ease-in-out] transition-all px-5 bg-white/90 m-2 p-4 rounded-lg shadow-2xs backdrop-blur-md'>
          <div className='flex items-center cursor-pointer' onClick={closeReader}>
            <MoveLeft className='m-2 p-1 text-white bg-black rounded-2xl' />
            Back
          </div>
          <iframe src={selectedBook?.fileUrl} className='h-full w-full'></iframe>
        </div>
      )}
    </div>
  )
}
export default Page