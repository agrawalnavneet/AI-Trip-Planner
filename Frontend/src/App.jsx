import { useState } from 'react'
import './App.css'
import { Button } from "./components/ui/button"; 

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2> Welcome to our Trivago</h2>
      <button> submit</button>
    </>
  )
}

export default App
