import { useState } from 'react'
import Card from './components/Card'
import data from './assets/data'


function App() {
  const [musicNumber, setMusicNumber] = useState(0)

  console.log(data[0])
  return (
    <div className="container">
      <main>
        <Card props={{musicNumber,setMusicNumber}}/>
      </main>
     
    </div>
  )
}

export default App
