import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

import Uberpng from '../../assets/pngegg.png'
import Map from '../../assets/map.jpg'
import Passenger from '../../assets/vinay.jpg'
import { NavLink } from 'react-router-dom'

import { IoLogOutOutline } from "react-icons/io5";

import CaptainProfileOffline from '../../components/captain/CaptainProfileOffline';
import ExploreRide from '../../components/captain/ExploreRide';
import VerifyOTP from '../../components/captain/VerifyOTP';
import CompleteRide from '../../components/captain/CompleteRide';


function CaptainHome() {

  const isOfflineRef = useRef(null);
  const exploreRideRef = useRef(null);
  const verifyOTPRef = useRef(null);
  const completeRideRef = useRef(null);

  const [isOffline, setIsOffline] = useState(true);
  const [exploreRide, setExploreRide] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState(false);
  const [completeRide, setCompleteRide] = useState(false);

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

  useGSAP(() => {
    if (completeRideRef.current) {
      let anim = gsap.to(completeRideRef.current, {
        transform: completeRide ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [completeRide])





  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <div className='relative'>
        <img
          src={Uberpng} alt=''
          className='w-30 absolute top-0 left-0'
        />
        <NavLink to='/captain/login' className='bg-red-500 px-4 py-1 rounded-full text-white absolute right-6 top-6 active:-translate-y-1 active:shadow-lg'><IoLogOutOutline size={'2rem'} /></NavLink>
      </div>

      {/* background map image */}
      <div className='object-cover h-screen w-screen'>
        <img src={Map} alt='' className='w-full h-full' />
      </div>

      {/* offline section */}
      <div ref={isOfflineRef}
        className='absolute bottom-0 w-screen bg-white p-5 rounded-t-2xl'>
        <CaptainProfileOffline
          setExploreRide={setExploreRide}
          setIsOffline={setIsOffline}
        />
      </div>

      {/* Ride pop-up */}
      <div ref={exploreRideRef}
        className='translate-y-full absolute bottom-0 w-screen bg-white rounded-t-2xl overflow-hidden border'>
        <ExploreRide
          setExploreRide={setExploreRide}
          setVerifyOTP={setVerifyOTP}
          setIsOffline={setIsOffline}
        />
      </div>

      {/* OTP section */}
      <div ref={verifyOTPRef}
        className='translate-y-full absolute bottom-0 w-screen bg-white rounded-t-2xl overflow-hidden border'>
        <VerifyOTP
          setCompleteRide={setCompleteRide}
          setVerifyOTP={setVerifyOTP}
          setIsOffline={setIsOffline}
        />
      </div>

      {/* Complete ride */}
      <div ref={completeRideRef}
        className='translate-y-full absolute bottom-0 w-screen bg-white rounded-t-2xl overflow-hidden border'>
        <CompleteRide
          setCompleteRide={setCompleteRide}
          setIsOffline={setIsOffline} />
      </div>


    </div>
  )
}

export default CaptainHome
