"use client"
import {useState} from 'react'
import { NextPage } from 'next'
import {PlusIcon, BookTextIcon, MoveRightIcon} from 'lucide-react'
import Markdown from 'react-markdown'
  interface Props {}

  const Myplace: NextPage<Props> = ({}) => {
    const books =["Maths ii", "Calculus iii", "Computer Science", "Algorithms of machine", "Python", "OS"]
    const [showMore, setShowMore] = useState<boolean>(false)
    const [chatHistory, setChatHistory] = useState<string[]>([])
    const [input,setInput] = useState<string>('')
    const [messageList,setMessageList] = useState<string[]>([])
    const [loading,setLoading] = useState(false)
    const [newChat,setNewChat] = useState(true)
    
    async function sendMessage(){
      try {
      if(!input?.trim()) return
        setLoading(true)
      const res = await fetch("/api/chat",{
        method:'POST',
        headers : {'Content-Type' : 'application/json'},
        body: JSON.stringify({message:input})
      })
      const data = await res.json()
      const reply = await data.reply
      console.log(reply)
      setNewChat(false)
      setMessageList(prev => [...prev,input,reply ])
      setInput('')
      console.log(messageList)
    }catch (err) {
    console.error('sendMessage failed:', err)
    }finally {
    setLoading(false)
    }
  }

    return <div className="flex h-screen  overflow-hidden chat bg-[linear-gradient(135deg,rgba(255,255,255,0.9)_0%,rgba(240,244,255,0.7)_100%)] ">
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
                  <BookTextIcon size={15} className='mr-1'/>
                  <span className='wrap-break-words'>
                    {book}
                  </span>
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
                <li 
                key={index}
                className="text-[#515151] bg-white flex-wrap break-all items-start gap-1 flex ">
                  <span className='wrap-break-words'>{chat}</span>
                </li>
              ))}
          </ul>
          </div>
      </div>
      </div>

      <div className="flex-3 grow flex flex-col">
        {newChat ? <div className="h-full flex flex-col items-center justify-center p-90 ">
        <h6 className='text-xl md:text-4xl pb-1 text-white/80'>Ask Me Anything!</h6>
        <div className="flex items-center rounded-4xl bg-white p-2 backdrop-blur-xs  shadow-2xl">
          <input type="text"
            value={input}
            onChange={(e)=>setInput(`${e.target.value }`)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Me..." 
            className="flex-1 text-xl h-full px-2 py-1 md:w-xl bg-transparent focus:outline-none " />
          <button
          type='button'
          onClick={()=>sendMessage()}
          disabled={loading}
          >  
          <MoveRightIcon className='mr-1' />
          </button>
        </div>
        </div>:
          <div className="flex-1 flex flex-col min-h-0 "> 
            <div className="flex-1 overflow-y-auto p-4 pb-44 space-y-4  w-full">{
          messageList.map((message,index)=>(
            <div className='tracking-wide leading-10   odd:transparent odd:text-end text-wrap break-all  odd: backdrop-blur-md even:text-black/90 p-3 overflow-y-scroll w-auto bg-white/70 odd:bg-black/70 odd:text-white rounded-2xl text-2xl m-4 block'
            key={index}>
              <Markdown>{message}</Markdown>
            </div>
          ))}
          </div>
          <div className="flex items-center absolute bottom-4 md:w-2/4 right-2/12  m-4 rounded-4xl bg-white p-2 backdrop-blur-xs  shadow-2xl">
          <input type="text"
            value={input}
            onChange={(e)=>setInput(`${e.target.value }`)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask Me..." 
            className="flex-1 text-xl h-full px-2 py-1 md:w-xl bg-transparent focus:outline-none " />
          <button
          onClick={()=>sendMessage()}
          disabled={loading}
          >  
          <MoveRightIcon className='mr-1' />
          </button>
          </div>

        </div>

        }
      </div>
    </div>
  }

  export default Myplace