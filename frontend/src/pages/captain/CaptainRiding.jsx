import React, { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

import Uberpng from '../../assets/pngegg.png'
import Map from '../../assets/map.jpg'
import { IoLogOutOutline } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa";
import CompleteRide from '../../components/captain/CompleteRide';
import { useNavigate } from 'react-router';
import { getSocketInstance } from '../../redux/reducer/socketReducer';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import LiveTracking from '../../components/LiveTracking';
function CaptainRiding() {

    const navigate = useNavigate();
    const completeRideRef = useRef(null);
    const [completeRidePanel, setCompleteRidePanel] = useState(false);
    const [ride, setRide] = useState();


    useEffect(() => {
        const rideDetail = document.cookie.split('; ').find(row => row.startsWith('rideDetails=')) 
            ? JSON.parse(decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('rideDetails=')).split('=')[1])) 
            : null;
        setRide(rideDetail);
    }, []);

    useEffect(() => {
        const socket = getSocketInstance();
        if (socket) {
          socket.on('ride-completed', (data) => {
            console.log('ride completed', data);
            document.cookie = 'rideDetails=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            navigate('/captain/home', { replace: true });
          })
        }
    
        return () => {
          socket.off('ride-completed');
        }
      }, [])


    useGSAP(() => {
        if (completeRideRef.current) {
            let anim = gsap.to(completeRideRef.current, {
                transform: completeRidePanel ? 'translateY(0)' : 'translateY(100%)',
                paused: true
            })
            anim.play();
            return () => anim.kill();
        }
    }, [completeRidePanel])

    return (
        <div className='h-screen w-screen relative overflow-hidden'>
            <div className='relative'>
                <img
                    src={Uberpng} alt=''
                    className='w-30 absolute top-0 left-0'
                />
                <div className='bg-red-500 px-4 py-1 rounded-full text-white absolute right-6 top-6 active:-translate-y-1 active:shadow-lg'><IoLogOutOutline size={'2rem'} /></div>
            </div>

            <div
        className='object-cover h-screen w-screen relative'>
        <div className="absolute inset-0 z-0">
          <LiveTracking containerStyle={{ height: '100%', width: '100%' }} />
        </div>
      </div>

            <div className='absolute bottom-0 rounded-lg w-screen bg-amber-500 pb-4 px-4'>
                <div className='flex justify-center items-center p-2'>
                    <FaChevronUp />
                </div>
                <h1 className='text-center font-semibold text-2xl mb-2 text-neutral-200'>Your ride is Started</h1>
                <div className='flex  justify-between items-center'>
                    <h1 className='text-xl'>Distance: <span className='font-bold'></span> </h1>
                    <button onClick={() => {
                        setCompleteRidePanel(true);
                    }} className='bg-green-500 rounded-lg p-2 text-xl font-semibold'>Complete Ride</button>
                </div>
            </div>

            <div
                ref={completeRideRef}
                className=' translate-y-full absolute bottom-0 w-screen bg-white rounded-t-2xl overflow-hidden border'>
                <CompleteRide
                    ride={ride}
                />
            </div>
        </div>
    )
}

export default CaptainRiding
