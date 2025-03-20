import React, { useEffect } from 'react'
import SearchingDriver from '../../assets/searching.jpg'
import { BsThreeDots } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";

function SearchingDriverComponent({ setSearchingDriver, setConfirmRide, searchingDriver, address }) {

    useEffect(() => {

        if (searchingDriver === true) {
            setTimeout(() => {
                // setSearchingDriver(false);
                // setConfirmRide(true);
            }, 3000)
        }
    }, [searchingDriver])

    return (
        <div>
            <div className='h-2 mx-auto w-16 bg-gray-400 rounded-full mt-2'></div>
            <h2 className='text-2xl font-semibold text-center mt-2'>Looking for nearby driver</h2>
            <div className='flex justify-center items-center'>
                <img src={SearchingDriver} className='h-40' alt='' />
            </div>
            <div className='border border-gray-400 '>
                <div className=' relative flex flex-col text-2xl p-4 gap-4'>
                    <div className='absolute top-20 left-8 h-12 w-1 bg-black flex flex-col justify-between'>
                        <div className='w-1 h-1 bg-white'></div>
                        <div className='w-1 h-1 bg-white'></div>
                    </div>
                    <div className='flex justify-between'>
                        <h3>Ride details</h3>
                        <BsThreeDots />
                    </div>
                    <h1 className='flex items-center'><div className='h-5 w-5 mx-2 rounded-full bg-black'></div>{address.pickup}</h1>
                    <h1 className='flex items-center'><div className='h-5 w-5 mx-2 rounded-sm bg-black'></div>{address.destination}</h1>
                    <div className='flex items-center gap-2 text-xl border-t border-gray-400 pt-4 '>
                        <RxAvatar size={'3rem'} />
                        <div className='flex w-full justify-between px-1 font-semibold'>
                            <h1>₹ 72.32 <p>Cash</p></h1>
                            <button className='text-white bg-neutral-600 px-4 rounded-full'>Switch</button>
                        </div>
                    </div>
                    <div onClick={() => setSearchingDriver(false)}
                        className='bg-red-500 text-center active:shadow-2xl active:bg-red-700 active:border-transparent text-white rounded-lg py-1'>Cancel</div>
                </div>
            </div>
        </div>
    )
}

export default SearchingDriverComponent
