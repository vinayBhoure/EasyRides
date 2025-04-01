import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Uberpng from '../../assets/pngegg.png'
import Map from '../../assets/map.jpg'
import { IoLogOutOutline } from "react-icons/io5";


import VerifyOTP from '../../components/captain/VerifyOTP';
import ExploreRide from '../../components/captain/ExploreRide';
import CompleteRide from '../../components/captain/CompleteRide';
import CaptainProfileOffline from '../../components/captain/CaptainProfileOffline';

import { captainExist } from '../../redux/reducer/captainReducer';
import { useLogoutCaptainMutation } from '../../redux/api/captainAPI';
import { useLazyGetCaptainProfileQuery } from '../../redux/api/captainAPI';
import { initializeSocket, getSocketInstance } from '../../redux/reducer/socketReducer';
import LiveTracking from '../../components/LiveTracking';


function CaptainHome() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOfflineRef = useRef(null);
  const exploreRideRef = useRef(null);
  const verifyOTPRef = useRef(null);
  const completeRideRef = useRef(null);

  const [isOffline, setIsOffline] = useState(true);
  const [exploreRide, setExploreRide] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [completeRide, setCompleteRide] = useState(false);
  const [ride, setRide] = useState(null);


  const userType = 'captain'; // Assuming the userType is always 'user' for this component
  const captainId = useSelector((state) => state.captain.captain._id);
  const connected = useSelector((state) => state.socket.connected);

  const [triggerCaptainProfile] = useLazyGetCaptainProfileQuery();
  const { mutate: logoutCaptain } = useLogoutCaptainMutation();

  async function confirmRide() {
    const token = localStorage.getItem('tokenC');
    const rideId = ride._id;
    const res = await fetch('http://localhost:5000/api/v1/rides/confirmRide', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rideId })
    });
    const data = await res.json();
    if (data.success === false) {

    }

    setRide(data.data);
  }

  const logoutHandler = () => {
    logoutCaptain(null, {
      onSuccess: () => {
        localStorage.removeItem('tokenC');
        navigate('/captain/login');
        toast.success('Logged out successfully');
      },
      onError: () => {
        console.log("Error logging out");
        toast.error('Error logging out');
      },
    });
  }

  useEffect(() => {
    const tokenC = localStorage.getItem('tokenC');
    if (tokenC) {
      triggerCaptainProfile().then(({ data }) => {
        if (data) {
          dispatch(captainExist({ captain: data.captain, tokenC }));
        }
      });
    }
  }, [dispatch, triggerCaptainProfile])

  useEffect(() => {
    dispatch(initializeSocket()); // Initialize the socket connection
  }, [dispatch]);

  useEffect(() => {
    if (connected && captainId) {
      const socket = getSocketInstance(); // Get the socket instance
      if (socket) {
        socket.emit('join', { userId: captainId, userType }); // Use socket.emit directly

        const locationInterval = setInterval(() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = {
                  ltd: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                socket.emit('update-location-captain', { userId: captainId, location });
              },
              (error) => {
                console.error("Error fetching location:", error);
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser.");
          }
        }, 10000); // 10 seconds interval

        return () => clearInterval(locationInterval); // Cleanup interval on unmount
      }
    }
  }, [connected, captainId]);

  useEffect(() => {
    const socket = getSocketInstance();
    if (socket) {
      socket.on('new-ride', (data) => {
        console.log('New ride received:', data); // Log the received data
        setRide(data); // Update the ride state with the received data
        setExploreRide(true); // Show the ExploreRide component
        setIsOffline(false); // Set offline state to false
      });

      return () => {
        socket.off('new-ride'); // Clean up the listener on unmount
      };
    }
  }, [])

  useGSAP(() => {
    if (isOfflineRef.current) {
      let anim = gsap.to(isOfflineRef.current, {
        transform: isOffline ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [isOffline])

  useGSAP(() => {
    if (exploreRideRef.current) {
      let anim = gsap.to(exploreRideRef.current, {
        transform: exploreRide ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [exploreRide])

  useGSAP(() => {
    if (verifyOTPRef.current) {
      let anim = gsap.to(verifyOTPRef.current, {
        transform: verifyOTP ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [verifyOTP])

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <div className='relative'>
        <img
          src={Uberpng} alt=''
          className='w-30 absolute top-0 left-0'
        />
        <div onClick={logoutHandler} className='bg-red-500 px-4 py-1 rounded-full text-white absolute right-6 top-6 active:-translate-y-1 active:shadow-lg'><IoLogOutOutline size={'2rem'} /></div>
      </div>

      {/* background map image */}

      <div
        className='object-cover h-screen w-screen relative'>
        <div className="absolute inset-0 z-0">
          <LiveTracking containerStyle={{ height: '100%', width: '100%' }} />
        </div>
      </div>

      {/* offline section */}
      <div
        ref={isOfflineRef}
        className='absolute bottom-0 w-screen bg-white p-5 rounded-t-2xl'>
        <CaptainProfileOffline
          setExploreRide={setExploreRide}
          setIsOffline={setIsOffline}
        />
      </div>

      {/* Ride pop-up */}
      <div
        ref={exploreRideRef}
        className='translate-y-full min-h-[60vh] absolute bottom-0 w-screen bg-white rounded-t-2xl overflow-hidden border'>
        <ExploreRide
          ride={ride}
          confirmRide={confirmRide}
          setExploreRide={setExploreRide}
          setVerifyOTP={setVerifyOTP}
          setIsOffline={setIsOffline}
        />
      </div>

      {/* OTP section */}
      <div
        ref={verifyOTPRef}
        className='translate-y-full absolute bottom-0 w-screen bg-white rounded-t-2xl overflow-hidden border'>
        <VerifyOTP
          ride={ride}
          setCompleteRide={setCompleteRide}
          setVerifyOTP={setVerifyOTP}
          setIsOffline={setIsOffline}
        />
      </div>

      {/* Complete ride */}


    </div>
  )
}

export default CaptainHome
