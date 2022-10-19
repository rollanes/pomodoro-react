import React, { useState, useEffect } from 'react';
import { Session } from './Session';
import { Break } from './Break';
import { Timer } from "./Timer";

export const Pomodoro = () => {
  
  const [breakLength, setBreakLength] = useState(5*60)
  const [sessionLength, setSessionLength] = useState(25 * 60)

  const [mode, setMode] = useState('session')
  const [timeLeft, setTimeLeft] = useState()
  const [isActive, setIsActive] = useState(false)
  const [timeSpent, setTimeSpent] = useState(0)
  const [beep] = useState(
    new Audio('https://cdn.freesound.org/previews/337/337049_3232293-lq.mp3')
  )
  const [beepPlaying, setBeepPlaying] = useState(false)

  useEffect(() => {
    setTimeLeft(mode == 'session' ? sessionLength * 1000 : breakLength * 1000);
  }, [sessionLength, breakLength])

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 1) {
      setTimeLeft(
        mode == 'session'
        ? sessionLength * 1000 - timeSpent
        : breakLength * 1000 - timeSpent
      );

      interval = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1000)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    if (timeLeft === 0) {
      beep.play();
      setBeepPlaying(true);
      setTimeSpent(0);
      setMode((mode) => (mode == 'session' ? 'break' : 'session'));
      setTimeLeft(
        mode == 'session' ? sessionLength * 1000 : breakLength * 1000
      )
    }
    return () => clearInterval(interval)
  }, [isActive, timeSpent])

  useEffect(() => {
    beep.addEventListener('ended', () => setBeepPlaying(false));
    return () => {beep.addEventListener('ended', () => setBeepPlaying(false))
  };
  }, [])
  
  const reset = () => {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimeLeft(mode == 'session' ? sessionLength * 1000 : breakLength * 1000);

    if (isActive) {
      setIsActive(false);
      setTimeLeft(0)
    }

    if(beepPlaying){
      beep.pause();
      beep.currentTime(0);
      setBeepPlaying(false)
    }
  }

  const toggleIsActive = () => {
    setIsActive(!isActive)
  }

  const decrementBreakLength = () => {
    const decrementedBrLength = breakLength - 60 > 60 ? breakLength - 60 : 60;
    setBreakLength(decrementedBrLength)
  }

  const incrementBreakLength = () => {
    const incrementedBrLength = breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60;
    setBreakLength(incrementedBrLength)
  }

  const decrementSessionLength = () => {
    const decrementedSesLength = sessionLength - 60 > 60 ? sessionLength - 60 : 60;
    setSessionLength(decrementedSesLength)
}

  const incrementSessionLength = () => {
    const incrementedSesLength = sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60 * 60;
    setSessionLength(incrementedSesLength)
  }

  return (
    <div className='container text-center'>
      <h1>Pomodoro Clock</h1>
      <hr/>

      <Timer time={timeLeft} mode={mode}/>
      <div className='buttons text-center'>
        <button className='btn btn-warning btnstart' onClick={toggleIsActive} id='start-stop'>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className='btn btn-danger' onClick={reset} id='reset'>
          Reset
        </button>
      </div>
    <div className='row options'>
      <Break 
        increment={incrementBreakLength}
        decrement={decrementBreakLength}
        length={breakLength}
      />
      
      <Session 
        increment={incrementSessionLength}
        decrement={decrementSessionLength}
        length={sessionLength}
      />

    </div>
  </div>
  )
}
