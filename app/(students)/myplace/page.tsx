  "use client"
  import {useState} from 'react'
  import { NextPage } from 'next'
import {PlusIcon, BookTextIcon, MoveRightIcon} from 'lucide-react'
  interface Props {}

  const Myplace: NextPage<Props> = ({}) => {
    const books =["Maths ii", "Calculus iii", "Computer Science", "Algorithms of machine", "Python", "OS"]
    const [showMore, setShowMore] = useState<boolean>(false)
    const [chatHistory, setChatHistory] = useState<string[]>([])
    // const [greaterBooks, setGreaterBooks] = useState<boolean>(false)
    // if (books.length < 3) setGreaterBooks(false)
    return <div className="flex chat overflow-hidden  bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(240,244,255,0.7)_100%)] ">
      <div className="p-1">

          <div className="p-3 rounded-xl backdrop-blur-lg ring-1 ring-gray-300 bg-white/90 h-screen overflow-y-scroll shadow-2xs ">

            <span className="font-extrabold text-black text-center text-lg block ">SMIU</span>
            <span className="font-extrabold text-black text-center block text-2xl -mt-2">E-Learner</span>
    
            <div className="p-2  ring-1 ring-gray-300 bg-white/80 rounded-4xl mt-10">
              <h6 className="p-2   text-black/30">My Books</h6>
                {/* <input type="text" placeholder="Search" className="flex-1 p-2 rounded-l-md w-44  focus:outline-none" /> */}
            <ul className='p-2'>
              {showMore ? books.map((book, index) => (
                <li key={index} className="text-[#515151]  flex-wrap wrap-break-word items-start gap-1 flex">
                  <BookTextIcon size={15} className='mr-1'/><span className='wrap-break-word'>{book}</span>
                </li>
              )) : books.slice(0, 3).map((book, index) => (
                <li key={index} className="text-[#515151] flex flex-wrap break-all items-start gap-1 ">
                  <BookTextIcon size={15} className='mr-1'/><span className='wrap-break-words'
                  >{book}</span>
                </li>
              ))}
            {books.length > 3 && (
              <span className="text-black/40 text-sm cursor-pointer" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Show More"}
              </span>)}
          </ul>
          </div>

        <div className="p-2  ring-1 ring-gray-300 bg-white/80 rounded-4xl mt-10">
              <h6 className="p-2  text-black/30">Recent</h6>
              <span className="text-black/40 text-sm cursor-pointer flex items-center" onClick={()=>setChatHistory(["Untitled",...chatHistory])} >
                <PlusIcon/> New Chat
              </span>
                {/* <input type="text" placeholder="Search" className="flex-1 p-2 rounded-l-md w-44  focus:outline-none" /> */}
            <ul className='p-2  flex-wrap break-all items-start gap-1'>
              {chatHistory.map((chat, index) => (
                <li key={index} className="text-[#515151]  flex-wrap break-all items-start gap-1 flex ">
                  <span className='wrap-break-words'>{chat}</span>
                </li>
              ))}
          </ul>
          </div>
      </div>
      </div>

      <div className="flex-3 grow">
        <div className="ha-full flex flex-col items-center justify-center p-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h6 className='text-xl md:text-4xl pb-1 text-white/80'>Ask Me Anything!</h6>
        <div className="flex items-center rounded-4xl bg-white p-2 backdrop-blur-xs  shadow-2xl">
          <input type="text" placeholder="Ask Me..." className="flex-1 text-xl h-full px-2 py-1 md:w-xl bg-transparent focus:outline-none " />
          <MoveRightIcon className='mr-1'/>
        </div>
        </div>
      </div>
    </div>
  }

  export default Myplace