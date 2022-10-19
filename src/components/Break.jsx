export const Break = ({increment, decrement, length}) => {

    return (
    <>
    <div className='col'>
        <p>Break</p>
        <button className='btn btn-info componentbtn' onClick={decrement}>-</button>
        <span>{length / 60}</span>
        <button className='btn btn-info componentbtn' onClick={increment}>+</button>
    </div>
    </>
    )
}
