import React, { useMemo } from 'react'

import { IoLocationSharp } from "react-icons/io5";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaPhoneAlt } from "react-icons/fa";

import Car from '../../assets/car.jpg'

function FinishRide({rideDetail}) {

    const captainName = rideDetail?.captain?.fullname?.firstname + " " + rideDetail?.captain?.fullname?.lastname
    const numberPlate = rideDetail?.captain?.vehicle?.number_plate
    const destination = rideDetail?.destination
    const fare = rideDetail?.fare
    const otp = rideDetail?.otp

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center text-right'>
                <img src={Car} alt='' className='h-20 rounded' />
                <div>
                    <h3 className='text-lg font-semibold'>{captainName}</h3>
                    <h2 className='text-xl font-bold'>{numberPlate}</h2>
                    <h4 className='text-base font'>Maruti suzuki alto</h4>
                </div>
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                <div className='flex items-center gap-4'>
                    <IoLocationSharp size={'2rem'} />
                    <div>
                        <h2 className='text-xl font-semibold'>{destination}</h2>
                        <h4 className='text-lg'>Kankariya Talab, Bhopal</h4>
                    </div>
                </div>
                <div className='h-0.5 rounded-full w-full bg-gray-300'></div>
                <div className='flex items-center gap-4'>
                    <FcMoneyTransfer size={'2rem'} />
                    <div>
                        <h2 className='text-xl font-semibold'>₹{fare}</h2>
                        <h4 className='text-lg'>Cash</h4>
                    </div>
                </div>
            </div>
            <button className='items-center flex justify-center gap-2 w-full bg-green-500 text-xl text-white rounded p-2 mt-5'>Make Payment</button>
        </div>
    )
}

export default FinishRide
