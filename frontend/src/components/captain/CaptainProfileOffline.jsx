import React from 'react'
import { RxAvatar } from "react-icons/rx";
import { LuNotebookText } from "react-icons/lu";

function CaptainProfileOffline({ setExploreRide, setIsOffline }) {
    return (
        <div>
            <div className='bg-gray-300 h-2 w-16 rounded-4xl mx-auto mb-2'></div>
            <div className='flex items-center gap-3'>
                <RxAvatar size={'3rem'} />
                <div className='text-left'>
                    <h2 className='text-xl font-semibold'>Vinay Bhoure</h2>
                    <p className='text-gray-500'>basicLevel</p>
                </div>
                <div className='ml-auto text-right'>
                    <h2 className='text-xl font-semibold'>Rs. 179</h2>
                    <p className='text-gray-500'>Earned</p>
                </div>
            </div>

            <div className='rounded-2xl py-5 w-full bg-amber-300 flex justify-around mt-5'>
                <div className='text-center'>
                    <LuNotebookText className='mx-auto' size={'2rem'} />
                    <h2 className='text-xl font-semibold'>10Km</h2>
                    <p>Total Distance</p>
                </div>
                <div className='text-center'>
                    <LuNotebookText className='mx-auto' size={'2rem'} />
                    <h2 className='text-xl font-semibold'>10Km</h2>
                    <p>Total Distance</p>
                </div>
                <div className='text-center'>
                    <LuNotebookText className='mx-auto' size={'2rem'} />
                    <h2 className='text-xl font-semibold'>10Km</h2>
                    <p>Total Distance</p>
                </div>
            </div>
            <button
                onClick={() => {
                    setIsOffline(false)
                    setExploreRide(true)
                }}
                className='w-full mt-5 bg-green-500 py-2  text-center rounded-md text-xl text-white font-semibold'>Go Online</button>
        </div>
    )
}

export default CaptainProfileOffline
