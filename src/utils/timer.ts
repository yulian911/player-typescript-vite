export const timer=(time:number)=>{
  let min:number |string ="0" + Math.floor(time/60)
  let sec:number |string = Math.floor(time%60)


  if(sec < 10){sec = "0"+String(sec)}
  
  return `${min}:${sec}`
}