import { useState } from 'react'
import Card from './components/Card'
import data from './assets/data'


function App() {
  const [musicNumber, setMusicNumber] = useState(0)

  console.log(data[0])
  return (
    <div className="container rounded-[15px] relative">
      <div className=' w-[150px] h-[150px] absolute rounded-[50%] bg-gradient-radial from-yellow-400 to-gray-9000 left-[-65px] top-[-65px]'></div>
      <div className=' w-[150px] h-[150px] absolute rounded-[50%] bg-gradient-radial from-[#ea22b1] to-[#111] right-[-65px] bottom-[-65px]'></div>
      <div className=' w-[60px] h-[60px] absolute rounded-[50%] bg-[#08e2ff]
      ] right-[7px] top-[10px] blur-[20px]'></div>
      <main>
        <Card props={{musicNumber,setMusicNumber}}/>
      </main>
     
    </div>
  )
}

export default App
