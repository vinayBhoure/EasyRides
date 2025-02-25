import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import React, { useRef, useState } from 'react'

import LocationComponent from '../../components/LocationComponent';
import VehicleComponent from '../../components/VehicleComponent';
import SearchingDriverComponent from '../../components/SearchingDriverComponent';

import { MdTimer } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import Uberpng from '../../assets/pngegg.png'
import Map from '../../assets/map.jpg'
import ConfirmRide from '../../components/ConfirmRide';



function UserHome() {

  const vehiclePanelOpenRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const locationPanelOpenRef = useRef(null)
  const locationPanelCloseRef = useRef(null)
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);

  const searchingDriverRef = useRef(null);
  const [searchingDriver, setSearchingDriver] = useState(false);

  const confirmRideRef = useRef(null);
  const [confirmRide, setConfirmRide] = useState(false);

  useGSAP(() => {
    // Animate location panel container if it exists
    if (locationPanelOpenRef.current) {
      let anim1 = gsap.to(locationPanelOpenRef.current, {
        height: locationPanelOpen ? '70%' : '0%',
        padding: locationPanelOpen ? 24 : 0,
        paused: true
      })
      anim1.play();
      return () => anim1.kill();
    }
    // Animate the close icon if it exists
    if (locationPanelCloseRef.current) {
      let anim2 = gsap.to(locationPanelCloseRef.current, {
        opacity: locationPanelOpen ? 1 : 0,
        paused: true
      })
      anim2.play();
      return () => anim2.kill();
    }
  }, [locationPanelOpen])

  useGSAP(() => {
    if (vehiclePanelOpenRef.current) {
      let anim = gsap.to(vehiclePanelOpenRef.current, {
        transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if (searchingDriverRef.current) {
      let anim = gsap.to(searchingDriverRef.current, {
        transform: searchingDriver ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [searchingDriver])

  useGSAP(() => {
    if (confirmRideRef.current) {
      let anim = gsap.to(confirmRideRef.current, {
        transform: confirmRide ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [confirmRide])



  const [address, setAddress] = useState({
    pickup: '',
    destination: ''
  });


  const changeHandler = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const [selectOption, setSelectOption] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <img
        src={Uberpng} alt=''
        className='w-30 absolute top-0 left-0'
      />

      {/* background map image */}
      <div className='object-cover h-screen w-screen'>
        <img src={Map} alt='' className='w-full h-full' />
      </div>

      {/* Add pickup and destination */}
      <div className='h-screen w-full absolute  top-0 flex flex-col justify-end'>
        <div className='min-h-max p-5 rounded-t-3xl bg-white'>
          {
            locationPanelOpen && <MdKeyboardArrowDown size={'2rem'} className='absolute right-5' ref={locationPanelCloseRef} onClick={() => setLocationPanelOpen(false)} />
          }
          <h4 className='text-2xl font-semibold'> Find Trip</h4>
          <form onSubmit={(e) => submitHandler(e)} className='relative'>
            <div className='h-16 w-2 py-1 flex flex-col justify-between items-center bg-neutral-800 absolute top-9 left-3 rounded-full'>
              <div className='h-1 w-1 bg-white rounded-[100%]'></div>
              <div className='h-1 w-1 bg-white rounded-[100%]'></div>
            </div>
            <input
              type='text'
              name='pickup'
              value={address.pickup}
              onClick={() => setLocationPanelOpen(true)}
              onChange={(e) => changeHandler(e)}
              placeholder='Add a pick-up location'
              className='bg-[#eee] text-base py-2 px-8 rounded-lg w-full mt-5'
            />
            <input
              type='text'
              name='destination'
              value={address.destination}
              onClick={() => setLocationPanelOpen(true)}
              onChange={(e) => changeHandler(e)}
              placeholder='Enter your destination'
              className='bg-[#eee] text-base py-2 px-8 rounded-lg w-full mt-3'
            />
          </form>
          <span className='flex items-center gap-1 font-semibold text-lg w-max bg-[#eee] px-4 py-2 mt-3 rounded-full '>
            <MdTimer size={'1.25rem'} />
            Leave me
            <MdKeyboardArrowDown size={'1.5rem'} className='' />
          </span>
        </div>

        {/* Search Location */}
        <div
          ref={locationPanelOpenRef}
          className={` 
        h-full p-5 border-t border-neutral-200 bg-white
        `}>
          <LocationComponent
            pickup={address.pickup}
            setLocationPanelOpenFunc={setLocationPanelOpen}
            setVehiclePanelOpenFunc={setVehiclePanelOpen}

          />
        </div>
      </div>

      {/* Select Vehicle */}
      <div
        ref={vehiclePanelOpenRef}
        className='fixed bottom-0 translate-y-full bg-white z-10 rounded-t-3xl w-screen px-5 pb-5'>
        <VehicleComponent
          setVehiclePaneOpen={setVehiclePanelOpen}
          setSearchingDriver={setSearchingDriver}
        />
      </div>

      {/* Driver Searching */}
      <div ref={searchingDriverRef}
        className='fixed translate-y-full bottom-0 bg-white rounded-t-3xl  w-screen'>
        <SearchingDriverComponent setSearchingDriver={setSearchingDriver} setConfirmRide={setConfirmRide} />
      </div>

      {/* Confirm Ride  */}
      <div ref={confirmRideRef}
        className='absolute bottom-0 translate-y-full bg-white rounded-t-3xl w-screen'>
        <ConfirmRide />
      </div>

    </div>
  )
}

export default UserHome
