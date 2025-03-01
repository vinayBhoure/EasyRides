import React from 'react'

import { FaUser } from "react-icons/fa6";

function RideDetail({ name, imgSrc, service, price, capacity, setSelectRide }) {
    return (
        <div
            onClick={() => setSelectRide(service)}
            className={` flex overflow-hidden rounded-xl border-2 border-gray-300 active:border-black mt-2`}>
            <img
                src={imgSrc}
                className='h-16 p-1'
            ></img>
            <div className='flex justify-between w-full px-2 py-1 items-center'>
                <div>
                    <h3 className='flex font-semibold items-center text-lg'> {service} <span className='ml-2'><FaUser size={'0.8rem'} /></span> {capacity} </h3>
                    <p className='text-sm'>2 mins away · 15:30</p>
                    <p className='text-sm text-slate-600'>Affordable, Comfortable</p>
                </div>
                <h2 className='font-bold text-xl'>₹{price}</h2>
            </div>
        </div>
    )
}

export default RideDetail