import { useState } from 'react'

export default function App() {
  const [count] = useState(0)

  return (
    <>
        <h1>Hello World {count}</h1>
    </>
  )
}

