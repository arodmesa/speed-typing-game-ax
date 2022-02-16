//http://api.quotable.io/random
import './App.css';
import React,{useState,useEffect, useRef} from 'react';
import { TextDisplay } from './componentes/TextDisplay';
import { Switch } from './componentes/Switch';

function App() {
  let btn_array={
    START:'Start',
    RESET:'Reset this game',
    AGAIN:'New Game'
  }
  let dif_array={
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard'
  }
const sound10s = require('./beep_10s.mp3');
const soundEnd= require('./beep_end.mp3');
const victory= require('./victory.mp3')

  const [num_chars, setNumChars]= useState('');
  const [time_remaining,setTime]=useState('');
  const [btn_text,setBtnText]=useState(btn_array.START);
  const [texto,setTexto]=useState('LOADING PHRASE. PLEASE WAIT.......');
  const [peticion,setPeticion]=useState(0);
  const [showBtn, setShowBtn]=useState(false);
  const [user_text, setUserText]=useState('');
  const [datos, setDatos]=useState();
  const [dificultad,setDificultad]=useState(dif_array.MEDIUM);
  //const ref_Timer=useRef(null);
  const ref_TextArea=useRef(null);
  const ref_Div_Text=useRef(null);
  const [timer_on,setTimerOn]=useState(false);
  const [checked_btn, setCheckedBtn]=useState([false, true, false]);
  const audio_end=useRef(null);
  const audio_10s=useRef(null);
  const audio_victory=useRef(null);

  ///////////////////////////////////////////
  function handleRadioBtn(num){
    let temp=checked_btn.map((elemento,index)=>{
     if (index!==num){
       return false;
     }
     else{
       return true;
     }
    })
    setCheckedBtn(temp);
  }

  function handleClick(text_boton){
    switch (text_boton){
      case btn_array.START:
        setBtnText(btn_array.RESET);
        setShowBtn(true);
        setTimerOn(true);
        //ref_Timer.current= setTimeout(timer, 1000);
        ref_TextArea.current.readOnly = false;
        //Iniciar los contadores
        break;
      case btn_array.RESET:
        setBtnText(btn_array.START);
        setNumChars(datos.value.length)
        //clearTimeout(ref_Timer.current);
        setTimerOn(false);
        setUserText('');
        ref_TextArea.current.classList.remove('red_background');
        ref_TextArea.current.readOnly = true;
        break;
      case btn_array.AGAIN:
        setPeticion((prevPeticion)=>prevPeticion+1);
        setBtnText(btn_array.START);
        setShowBtn(false);
        //clearTimeout(ref_Timer.current);
        setTimerOn(false);
        setUserText('');
        ref_TextArea.current.classList.remove('red_background');
        ref_TextArea.current.readOnly = true;
        break;
      default:
        break;
    }
    
  }

  function handleChange(event){
    setUserText(event.target.value);
    setNumChars(datos.value.length-event.target.value.length);
    if (datos.value.length-event.target.value.length<0){
      ref_TextArea.current.classList.add('red_background');
    }
    else{
      ref_TextArea.current.classList.remove('red_background');
    }
    if (event.target.value===texto){
      audio_victory.current.play();
      alert('CONGRATULATIONS!!! YOU WON!!!');
      //clearTimeout(ref_Timer.current);
      setTimerOn(false);
      ref_TextArea.current.readOnly = true;
      //Parar el juego
    }
    
  }

  function handleDif(dif){
    if (dif!==dificultad){
      switch (dif){
        case dif_array.EASY:
          setDificultad(dif_array.EASY);
          break;
        case dif_array.MEDIUM:
          setDificultad(dif_array.MEDIUM);
          break;
        case dif_array.HARD:
          setDificultad(dif_array.HARD)
          break;
        default:
          break;      
      }
     
    }    
  }

  function timer(){
    if(time_remaining-1===10){
      audio_10s.current.play();
    }
    if(time_remaining-1===0){
      audio_end.current.play();
    }
    if (time_remaining-1===0){
      alert('You lose :( !!!')
      //clearTimeout(ref_Timer.current);
      setTimerOn(false);
      ref_TextArea.current.readOnly = true;
    }
    setTime((prevTime)=>prevTime-1);    
  }

  ///////////////////////////////////////////

  useEffect(()=>{
    if (timer_on){
      let timer_temp=setTimeout(timer, 1000);
      return () => clearTimeout(timer_temp)
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[time_remaining,timer_on])
  
  useEffect(()=>{
    if(datos && timer_on===false){
      switch (dificultad){
        case dif_array.EASY:
          setTime(Math.floor(datos.value.length/1))
          break;
        case dif_array.MEDIUM:
          setTime(Math.floor(datos.value.length/2.5));
          break;
        case dif_array.HARD:
          setTime(Math.floor(datos.value.length/5));
          break;
        default:
          break;
      }
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dificultad,datos, btn_text])

  useEffect(()=>{
    fetch('https://api.chucknorris.io/jokes/random')
    .then(res=>res.json())
    .then(data=>{
      setDatos(data);
      setTexto(data.value)
      setNumChars(data.value.length)
      
    })    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[peticion])
  

  return (
    <div className="App">
      <div className='div_header'>
        <h1 className='h1_header'>How fast do you type?</h1>
      </div>
     <div className='div_displays'>
      <div className='div_p'>
        <p className='p_text'>{texto}</p>
      </div>     
      <TextDisplay user_text={user_text} handleChange={handleChange} ref_TextArea={ref_TextArea} ref_Div_Text={ref_Div_Text}/>
     </div>
     <div className='div_labels'>
      <h2 className='labels'>Time remaining: {(time_remaining<10)?'0':''}{time_remaining} seg</h2>
     </div>
     <div className='div_btn'>
        <button className='btn_1 buttons' type='button' onClick={()=>handleClick(btn_text)} >{btn_text} <i className={(btn_text===btn_array.START)?"fa fa-play-circle":"fa fa-refresh"} /></button>
        {showBtn&&<button className='btn_2 buttons' type='button' onClick={()=>handleClick(btn_array.AGAIN)}>{btn_array.AGAIN}</button>}
     </div>
     <div className='div_labels'>
      <h2 className='labels'>Characters remaining: {num_chars}</h2>
     </div>  
     <div className='div_dif'>
      <h2 className='labels'>Difficulty</h2>
      <Switch checked_btn={checked_btn} handleRadioBtn={handleRadioBtn} label1={dif_array.EASY} label2={dif_array.MEDIUM} label3={dif_array.HARD} handleDif={handleDif} />
     </div>  
     <audio src={sound10s} type="audio/mpeg" ref={audio_10s}></audio>      
     <audio src={soundEnd} type="audio/mpeg" ref={audio_end}></audio>
     <audio src={victory} type="audio/mpeg" ref={audio_victory}></audio>
     
    </div>
  );
}

export default App;
