import React from 'react'
import Car from '../assets/car.jpg'

function Loading() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <img src={Car} alt='' />
      <h1 className='text-lg'>Loading...</h1>
    </div>
  )
}

export default Loading
