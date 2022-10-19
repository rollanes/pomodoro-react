import React from 'react'

export const Timer = ({time, mode}) => {

  const min = Math.floor(time / 1000 / 60)
  const sec = Math.floor((time / 1000) % 60)

  return (
    <>
      <div id='timer'>
        <p id='timer-label'>{mode}</p>
        <p id='time-left'>
          {min}:{sec.toString().length === 1 ? '0' + sec : sec}
        </p>
      </div>
    </>
  )
}
