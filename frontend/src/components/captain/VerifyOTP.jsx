import React, { useEffect, useState } from 'react'
import Passenger from '../../assets/vinay.jpg'
import { getSocketInstance } from '../../redux/reducer/socketReducer';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateRideInfo } from '../../redux/reducer/rideReducer';

function VerifyOTP({ setVerifyOTP, setCompleteRide, setIsOffline, ride }) {

    const [otp, setOtp] = useState();
    const navigate = useNavigate();

    const passengerName = ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname;

    const startRideHandler = async () => {
        const token = localStorage.getItem('tokenC')
        try {
            const res = await fetch('http://localhost:5000/api/v1/rides/startRide', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rideId: ride?._id,
                    otp: otp
                })
            })
            const data = await res.json();
            if (data.success === false) {
                toast.error(data.message)
                return
            }
        } catch (err) {
            console.log(err);
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        const socket = getSocketInstance();
        if (socket) {
            socket.on('ride-started', (data) => {
                console.log('ride started', data);
                document.cookie = `rideDetails=${encodeURIComponent(JSON.stringify(data))}; path=/;`;
                navigate(`/captain/riding/`, { replace: true });
            })
        }

        return () => {
            socket.off('ride-started');
        }
    }, [])

    return (
        <div>
            <div className='flex gap-4 bg-gray-100 p-4 pt-6 shadow-lg'>
                <img src={Passenger} className='w-16 h-16 rounded-lg' alt='' />
                <div className='w-full flex justify-between items-start'>
                    <h1 className='text-2xl font-semibold'>{passengerName}</h1>
                    <div className='text-right'>
                        <h1 className='text-2xl font-semibold'>₹{ride?.fare}</h1>
                        <p className='text-lg text-gray-700'>2.2 Km</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-4 p-4'>
                <div>
                    <h2 className='text-lg text-gray-600'>Pick Up</h2>
                    <p className='text-2xl font-semibold'>{ride?.pickup}</p>
                </div>
                <div>
                    <h2 className='text-lg text-gray-600'>Drop off</h2>
                    <p className='text-2xl font-semibold'>{ride?.destination}</p>
                </div>
                <div className='flex flex-col gap-4 py-2 text-xl font-semibold text-white'>
                    <input type='number' name='otp' value={otp} onChange={(e) => {
                        setOtp(e.target.value);
                    }} placeholder='Enter OTP' className='text-gray-800 border rounded-md py-3 pl-3'></input>
                    <button onClick={startRideHandler} className={`w-full bg-green-500 py-3 rounded-md`}>Start Ride</button>
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
