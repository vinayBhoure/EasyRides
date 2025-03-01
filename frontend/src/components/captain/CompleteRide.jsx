import React from 'react'
import Passenger from '../../assets/vinay.jpg'

function CompleteRide({ setCompleteRide, setIsOffline }) {
  return (
    <div>
      <div className='flex gap-4 bg-gray-100 p-4 pt-6 shadow-md'>
        <img src={Passenger} className='w-16 h-16 rounded-lg' alt='' />
        <div className='w-full items-start'>
          <h2 className='text-lg text-gray-600'>Pick Up</h2>
          <p className='text-2xl font-semibold'>366, Rishi Palace Colony</p>
        </div>
      </div>

      <div className='flex flex-col gap-4 p-4'>
        <div className='flex justify-around'>
          <div>
            <h3 className='text-lg text-gray-600'>Time</h3>
            <h2 className='text-xl font-semibold'>5 min</h2>
          </div>
          <div>
            <h3 className='text-lg text-gray-600'>Distance</h3>
            <h2 className='text-xl font-semibold'>1.7 Km</h2>
          </div>
          <div>
            <h3 className='text-lg text-gray-600'>Amount</h3>
            <h2 className='text-xl font-semibold'>Rs. 39</h2>
          </div>
        </div>
        <div className='flex flex-col gap-4 py-2 text-xl font-semibold text-white'>
          <button
            onClick={() => {
              setIsOffline(true)
              setCompleteRide(false)
            }}
            className='w-full bg-green-500 py-3 rounded-md'> Complete Ride</button>
        </div>
      </div>
    </div>
  )
}

export default CompleteRide
