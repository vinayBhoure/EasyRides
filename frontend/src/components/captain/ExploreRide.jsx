import React from 'react'
import Passenger from '../../assets/vinay.jpg'

function ExploreRide({ setExploreRide, setVerifyOTP, setIsOffline, ride, confirmRide }) {

    const fullname = ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname
    const fare = ride?.fare
    const pickup = ride?.pickup
    const destination = ride?.destination

    return (
        <div className=''>
            <div className='flex gap-4 bg-gray-100 p-4 pt-6 shadow-lg'>
                <img src={Passenger} className='w-16 h-16 rounded-lg' alt='' />
                <div className='w-full flex justify-between items-start'>
                    <h1 className='text-2xl font-semibold'>{fullname}</h1>
                    <div className='text-right'>
                        <h1 className='text-2xl font-semibold'>Rs.{fare}</h1>
                        <p className='text-lg text-gray-700'>2.2 Km</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 p-4'>
                <div>
                    <h2 className='text-lg text-gray-600'>Pick Up</h2>
                    <p className='text-2xl font-semibold'>{pickup}</p>
                </div>
                <div>
                    <h2 className='text-lg text-gray-600'>Drop off</h2>
                    <p className='text-2xl font-semibold'>{destination}</p>
                </div>
                <div className='flex gap-4 py-2 text-xl font-semibold text-white'>
                    <button onClick={() => {
                        setExploreRide(false)
                        setVerifyOTP(true)
                        confirmRide();
                    }} className='w-full bg-green-500 py-3 rounded-md'>Accept</button>
                    <button onClick={() => {
                        setIsOffline(true)
                        setExploreRide(false)
                    }} className='w-full bg-gray-500 py-3 rounded-md'>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default ExploreRide
