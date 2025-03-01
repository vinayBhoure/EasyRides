import React, { useState } from 'react'
import Passenger from '../../assets/vinay.jpg'

function VerifyOTP({ setVerifyOTP, setCompleteRide, setIsOffline }) {

    const [otp, setOtp] = useState();

    return (
        <div>
            <div className='flex gap-4 bg-gray-100 p-4 pt-6 shadow-lg'>
                <img src={Passenger} className='w-16 h-16 rounded-lg' alt='' />
                <div className='w-full flex justify-between items-start'>
                    <h1 className='text-2xl font-semibold'>Vinay Bhoure</h1>
                    <div className='text-right'>
                        <h1 className='text-2xl font-semibold'>Rs. 25</h1>
                        <p className='text-lg text-gray-700'>2.2 Km</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 p-4'>
                <div>
                    <h2 className='text-lg text-gray-600'>Pick Up</h2>
                    <p className='text-2xl font-semibold'>366, Rishi Palace Colony</p>
                </div>
                <div>
                    <h2 className='text-lg text-gray-600'>Drop off</h2>
                    <p className='text-2xl font-semibold'>Manit Bhopal</p>
                </div>
                <div className='flex flex-col gap-4 py-2 text-xl font-semibold text-white'>
                    <input type='number' name='otp' value={otp} onChange={(e) => {
                        setOtp(e.target.value);
                    }} placeholder='Enter OTP' className='text-gray-800 border rounded-md py-3 pl-3'></input>
                    <button onClick={() => {
                        if (otp?.length === 4) {
                            setVerifyOTP(false)
                            setCompleteRide(true)
                        } if ((otp?.length > 0 && otp?.length < 4) || otp?.length > 4) {

                            alert('enter otp 4 digits');
                        } else {
                            alert('enter otp first');
                        }
                    }} className={`w-full bg-green-500 py-3 rounded-md`}>Start Ride</button>
                    <button onClick={() => {
                        setIsOffline(true)
                        setVerifyOTP(false)
                    }} className='w-full bg-red-500 py-3 rounded-md'>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP
