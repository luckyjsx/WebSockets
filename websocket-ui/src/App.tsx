

import { useEffect, useRef, useState } from 'react'
import './App.css'
import './index.css'


function App() {
  const [messages, setMessages] = useState(["hi there", "hello"])
  const [message, setMessage] = useState("")
  const wsRef = useRef<WebSocket | null>(null)
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }
    wsRef.current = ws
    ws.onopen = () =>{
      ws.send(
        JSON.stringify({
          type:"join",
          payload:{
            roomId:"red"
          }
        })
      )
    }

    return () =>{
      ws.close()
    }
  }, [])

const onSendClick = () => {
  if (wsRef.current) {
    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message
        }
      })
    );
    setMessage(""); // Optional: clear input after sending
  } else {
    console.warn("WebSocket is not open yet.");
  }
};


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setMessage(e.target.value)
  }

  return (
    <div className='h-screen bg-black '>
      <div className='h-[85vh]'>
        {messages.map((msg, index) => (
            <div className='m-8'>
              <span className='bg-white text-black rounded p-4 '>{msg}</span>

            </div>
        ))}
      </div>
      <div className='w-full bg-white flex'>
        <input onChange={onInputChange} className='flex-1 p-4' placeholder='Type a message...' />
        <button onClick={onSendClick} className='bg-blue-500 text-white p-4'>Send</button>
      </div>
    </div>
  )
}

export default App
