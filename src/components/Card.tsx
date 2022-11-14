import React, { useState } from 'react'
import {MdExpandMore,MdQueueMusic,MdRepeat,MdSkipPrevious,MdSkipNext, MdPlayArrow, MdVolumeUp} from 'react-icons/md'

import musics from '../assets/data'

interface IProps{
  musicNumber:number
  setMusicNumber:(type:number) => void
}
type MusicNumberType ={
props:IProps
}

const Card = ({props:{setMusicNumber,musicNumber}}:MusicNumberType) => {

const [show, setShow] = useState(true)

  return (
    <div className="card w-[100%] overflow-hidden p-[25px]">
      <div className="nav w-[100%] flex justify-between">
         <MdExpandMore className='i'/>
         <span>Now Playing {musicNumber+1}/{musics.length}</span>
         <MdQueueMusic className='i'/>
      </div>
      <div className="img w-[100% h-[270px] flex justify-center relative">
        <img src={musics[musicNumber].thumbnail} className='w-[200px] h-[200px] object-cover rounded-[50%]' />
      </div>
      <div className="details w-[100%] text-center ">
        <p className="title text-[1.2rem]">{musics[musicNumber].title}</p>
        <p className="artist text-[#bbb]">{musics[musicNumber].artist}</p>
      </div>
      <div className="progress mt-[15px] ">
        <input type="range" min={0} max={100} className='w-[100%] h-[4px]'  />
      </div>
      <div className="timer w-[100%] flex  justify-between text-[0.8rem]">
        <span>00:00</span>
        <span>03:43</span>
      </div>
      <div className="controls w-[100%] flex justify-between items-center mt-[20px] mb-[30px] ">
        <MdRepeat className='i'/>
        <MdSkipPrevious className='i text-[2.5rem]'/>
        <div className="play w-[3.2rem] h-[3.2rem] bg-gradient-to-r from-[#fff] to-[#cecaca] rounded-[50%] flex justify-center items-center relative before:content-[''] before:absolute before:h-[2.5rem] before:w-[2.5rem] before:rounded-[inherit]  before:bg-gradient-to-r before:from-[#8dadff] before:to-[#6e72a3]">
          
          <MdPlayArrow  className="i bg-[#fff]   absolute"/>
        </div>
       
        <MdSkipNext className='i text-[2.5rem] '/>
        <div className={`volume w-[100%] h-[50px] bg-[#333] absolute ${show? 'bottom-0':'bottom-[-10%]'} left-0 rounded-[10px] border-[1px] border-[#555] flex justify-between items-center p-[25px] z-[5] transition`}>
          <MdVolumeUp className='i'/>
          <input type='range' min={0} max={100} />
          <span>50</span>
        </div>
        <MdVolumeUp className='i'/>
      </div>
      <audio src={musics[musicNumber].src}  hidden></audio>
    </div>
  )
}

export default Card