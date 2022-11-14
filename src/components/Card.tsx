import React from 'react'
import {MdExpandMore} from 'react-icons/md'
import css from './card.module.css'

interface IProps{
  musicNumber:number
  setMusicNumber:(type:number) => void
}
type MusicNumberType ={
props:IProps
}

const Card = ({props:{setMusicNumber,musicNumber}}:MusicNumberType) => {

  return (
    <div className="card">
      <div className="nav">
         <MdExpandMore className='i'/>
         <span>Now Playing</span>
      </div>
    </div>
  )
}

export default Card