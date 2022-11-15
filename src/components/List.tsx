import React,{useEffect, useState} from 'react'
import { MdClose, MdQueueMusic } from 'react-icons/md'
import musics from '../assets/data'
import { timer } from '../utils/timer'



interface IProps{
  musicNumber:number
  setMusicNumber:(type:number) => void
  open: boolean,
  setOpen:(idk:boolean)=>void
}
type ListTypeProps={
  props:IProps
}
interface IMusicprops{
  id: number;
    title: string;
    artist: string;
    thumbnail: string;
    src: string;
}
type MusicTypeProps={
  music:IMusicprops
}

const Duration =({music}:MusicTypeProps)=>{
const [duration,setDuration] =useState(0)
    useEffect(() => {
    const audio = new Audio(music.src)
    audio.onloadedmetadata =function() {
      if(audio.readyState > 0){
        setDuration(audio.duration)
      }
    }
    }, [music])

      return(
        <span className='text-[0.9rem]'>{timer(duration)}</span>
      )
    }




const List = ({props:{open,setOpen,musicNumber,setMusicNumber}}:ListTypeProps) => {
  return (
    <div className={`list w-[100%] absolute ${open? 'bottom-0': 'bottom-[-60%]'} left-0 bg-[#fff] text-[#080710] shadow-lg shadow-[rgba(0,0,0,0.1)] transition-all delay-100 ease-out rounded-[10px]  z-10`}>
      <div className="header w-[100%] py-[15px] px-[20px] flex justify-between items-center ">
        <div className='flex gap-3 items-center'>
          <MdQueueMusic className='i text-[1.7rem]' />
          <span className='text-[1.25rem] capitalize text-[#444]'>Music List</span>
        </div>
        <MdClose className='i'  onClick={()=>setOpen(false)}/>
      </div>

        <ul className="header w-[100%] h-[250px] overflow-y-scroll ">
          {
            musics.map((music,i)=>(
              <li key={music.id} className={`w-[100%] py-[10px] px-[30px] flex  justify-between cursor-pointer border-[1px] border-[#eee] hover:bg-[palegoldenrod] ${musicNumber ===i? 'bg-[papayawhip]':null}`} onClick={()=>setMusicNumber(i)}>
                <div className="row ">
                  <span>{music.title}</span>
                  <p className='text-[#999] text-[0.85rem]'>{music.artist}</p>
                </div>
                <Duration music={music} />
              </li>
            ))
          }

        </ul>
      
    </div>
  )
}

export default List