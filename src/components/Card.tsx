import React, { useState,useRef,useEffect } from 'react'
import {MdExpandMore,MdQueueMusic,MdRepeat,MdSkipPrevious,MdSkipNext, MdPlayArrow, MdVolumeUp, MdOutlinePause, MdVolumeOff, MdRepeatOne, MdOutlineShuffle} from 'react-icons/md'

import musics from '../assets/data'
import { timer } from '../utils/timer'
import { vizualizer } from '../utils/vizualizer'

interface IProps{
  musicNumber:number
  setMusicNumber:(type:number) => void
  open: boolean,
  setOpen:(idk:boolean)=>void
}
type MusicNumberType ={
props:IProps
}



const Card = ({props:{setMusicNumber,musicNumber,open,setOpen}}:MusicNumberType) => {

    const [show, setShow] = useState(false)
    const [duration,setDuration] =useState(0)
    const [currentTime,setCurrentTime] =useState(0)
    const [play,setPlay] =useState(false)
    const [volume,setVolume] =useState<number>(50)
    const [repeat,setRepeat] =useState('repeat')


    const audioRef =useRef<any>()
    const canvasRef =useRef<any>()

    const handleloadStart =(e:any)=>{
      // console.log(e.nativeEvent.srcElement.src)

      // const src =e.nativeEvent.srcElement.src
      // const audio = new Audio(src)
      // audio.onloadedmetadata =function(){
      //   if(audio.readyState> 0){
      //     setDuration(audio.duration)
      //   }
      // }
      setDuration(audioRef.current.duration)
      if(play){
        audioRef.current.play()
      }
    }
// play/pause 
    const handlePlaying =()=>{
      vizualizer(audioRef.current,canvasRef.current,play)
      if(play){
        audioRef.current.pause()
        setPlay(false)
      }else{
        audioRef.current.play()
        setPlay(true)
      }
    }
// aktualny czas 
    const handletimerUpdate =()=>{
      // console.log('timer update')
      const currentTime=audioRef.current.currentTime;
      setCurrentTime(currentTime)
    }

//  zmiana suwaka z czasem 
    const changeCurrentTime = (e:any)=>{
      const currentTime = Number(e.target.value)
      audioRef.current.currentTime = currentTime;
      setCurrentTime(currentTime)
    }
    // poprzednia /mnastępna piosenka
    const handleNextPrev =(n:any)=>{
     if(musicNumber >0 && n===-1){
       setMusicNumber(musicNumber-1)
     }
     if((musics.length-1) > musicNumber && n===1){
      
      setMusicNumber(musicNumber+1)
     }
    }

    ///powtarzanie  
    const handleRepeat =(value:string)=>{
      
        switch(value){
          case 'repeat':
            return setRepeat('repeat_one')
          case 'repeat_one':
              return setRepeat('shuffle')
        default:
          return setRepeat('repeat')
        }

    }
const EndedAudio =()=>{
  switch(repeat){
    case 'repeat_one':
      return audioRef.current.play()
    case 'shuffle':
      return handleSuffle()
  default:
    return handleNextPrev(1)
  }
}

// randomowa piosenka
 const handleSuffle=()=>{
  const num =randomNumber()
  setMusicNumber(num)
 }

 function randomNumber(){
  let number =Math.floor(Math.random() *(musics.length -1));
  if(number ===musicNumber) return number =Math.floor(Math.random() *(musics.length -1));
  return number
 }


    // zmiana glosnosci
    useEffect(()=>{
      audioRef.current.volume =volume /100 //0-1
    },[volume])

  return (
    <div className="card w-[100%] overflow-hidden p-[25px]">
      <div className="nav w-[100%] flex justify-between">
         <MdExpandMore className='i'/>
         <span>Now Playing {musicNumber+1}/{musics.length}</span>
         <MdQueueMusic className='i' onClick={()=>setOpen(true)}/>
      </div>
      <div className="img w-[100% h-[270px] flex justify-center relative items-center">
        <img src={musics[musicNumber].thumbnail} className={`w-[200px] h-[200px] object-cover rounded-[50%]
        ${play ?'animate-spin-slow':null}
        `} />
        <canvas className='absolute w-full h-full bottom-0 left-0' ref={canvasRef}/>
      </div>
      <div className="details w-[100%] text-center ">
        <p className="title text-[1.2rem]">{musics[musicNumber].title}</p>
        <p className="artist text-[#bbb]">{musics[musicNumber].artist}</p>
      </div>
      <div className={`progress mt-[15px] `}>
        <input type="range" min={0} max={duration} className='w-[100%] h-[4px]  '  
       
        value={currentTime} onChange={(e)=>changeCurrentTime(e)}/>
      </div>
      <div className="timer w-[100%] flex  justify-between text-[0.8rem]">
        <span>{timer(currentTime)}</span>
        <span>{timer(duration)}</span>
      </div>
      <div className="controls w-[100%] flex justify-between items-center mt-[20px] mb-[30px] ">
        { repeat === 'repeat' && <MdRepeat className='i' onClick={()=>handleRepeat('repeat_one')}/>}
        { repeat === 'repeat_one' && <MdRepeatOne className='i' onClick={()=>handleRepeat('shuffle')}/>}
        { repeat === 'shuffle' && <MdOutlineShuffle className='i' onClick={()=>handleRepeat('repeat')}/>}
        
        
        
        <MdSkipPrevious className='i text-[2.5rem]' onClick={()=>handleNextPrev(-1)}/>
        <div className="play w-[3.2rem] h-[3.2rem] bg-gradient-to-r from-[#fff] to-[#cecaca] rounded-[50%] flex justify-center items-center relative before:content-[''] before:absolute before:h-[2.5rem] before:w-[2.5rem] before:rounded-[inherit]  before:bg-gradient-to-r before:from-[#8dadff] before:to-[#6e72a3]"
          onClick={handlePlaying}
        >
          
          {play ? 
         <MdOutlinePause className="i bg-[transparent]   absolute"/>
          :
          
          <MdPlayArrow  className="i bg-[transparent]   absolute" />
          }
      
        </div>
       
        <MdSkipNext className='i text-[2.5rem] ' onClick={()=>handleNextPrev(1)}/>
        <div className={`volume w-[100%] h-[50px] bg-[#333] absolute ${show? 'bottom-0':'bottom-[-10%]'} left-0 rounded-[10px] border-[1px] border-[#555] flex justify-between items-center p-[25px] z-[5] transition`}>
          {volume==0? 
          <MdVolumeOff className='i' onClick={()=>setVolume(50)}/>
          :
          <MdVolumeUp className='i' onClick={()=>setVolume(0)}/>
          }
          <input type='range' min={0} max={100} className={`w-[80%]  `}
          // style={{background:`linear-gradient(to right, ${volume}% #e5e5e5 ${volume}%`}}
          value={volume} onChange={(e)=>setVolume(Number(e.target.value))}/>
          <div className='w-[10%] flex justify-center'>
            <span >{volume}</span>
          </div>
        </div>
        <MdVolumeUp className='i' onClick={()=>setShow(!show)}/>
      </div>
      <audio 
        src={musics[musicNumber].src}  
        hidden 
        onLoadedData={handleloadStart} 
        ref={audioRef}
        onTimeUpdate={handletimerUpdate}
        onEnded={EndedAudio}
      />
      
    </div>
  )
}

export default Card