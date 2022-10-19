import React from 'react'

export const Session = ({increment, decrement, length}) => {

    return (
    <>
        <div className='col'>
            <p>Study/Code</p>
            <button className='btn btn-info componentbtn' onClick={decrement}>-</button>
            <span>{length / 60}</span>
            <button className='btn btn-info componentbtn' onClick={increment}>+</button>
        </div>
    </>
    )
}
