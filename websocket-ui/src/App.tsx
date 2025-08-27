
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const inputRef= useRef<HTMLInputElement>(null)

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080')
    console.log("laxman...",ws)
    setSocket(ws)

    ws.onmessage = (event) => {
      alert(event.data)
    }

  },[])

  const sendMessage = () => {
    console.log("hello world")
    socket?.send(inputRef.current?.value || '') 
  }

  return (
    <>
      <div>
        <input ref={inputRef} type='text' placeholder='message'></input>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  )
}

export default App
