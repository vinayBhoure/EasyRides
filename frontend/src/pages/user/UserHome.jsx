import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import React, { useRef, useState, useEffect } from 'react'

import LocationComponent from '../../components/user/LocationComponent';
import VehicleComponent from '../../components/user/VehicleComponent';
import SearchingDriverComponent from '../../components/user/SearchingDriverComponent';
import ConfirmRide from '../../components/user/ConfirmRide';

import { MdTimer } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

import Uberpng from '../../assets/pngegg.png'
import Map from '../../assets/map.jpg'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../../redux/api/userAPI';
import { userExist } from '../../redux/reducer/userReducer'
import { useCreateRideMutation, useGetFareQuery } from '../../redux/api/rideAPI';
import { sendMessage } from '../../redux/reducer/socketReducer';

function UserHome() {

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  // // Get token from localStorage
  // const userToken = localStorage.getItem('tokenU');

  // // Fetch user profile if token exists
  // const { data: userProfile, isLoading, isError } = useGetUserProfileQuery(undefined, {
  //   skip: !userToken
  // });

  const vehiclePanelOpenRef = useRef(null)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const locationPanelOpenRef = useRef(null)
  const locationPanelCloseRef = useRef(null)
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);

  const searchingDriverRef = useRef(null);
  const [searchingDriver, setSearchingDriver] = useState(false);

  const confirmRideRef = useRef(null);
  const [confirmRide, setConfirmRide] = useState(false);

  const [address, setAddress] = useState({
    pickup: '',
    destination: ''
  });

  const [vehicleType, setVehicleType] = useState('');

  const [activeInput, setActiveInput] = useState(null);

  // const loadUser = () => {
  //   // If no token exists, redirect to start page
  //   if (!userToken) {
  //     navigate('/');
  //     return;
  //   }
  //   // Update Redux store with user data if profile fetch successful
  //   if (userProfile) {
  //     dispatch(userExist({
  //       token: userToken,
  //       user: userProfile.user,
  //       isAuthenticated: true
  //     }));
  //   }

  //   // Handle error case (invalid token, etc)
  //   if (isError) {
  //     localStorage.removeItem('tokenU');
  //     navigate('/');
  //   }
  // }

  // useEffect(() => {
  //   loadUser();
  // }, [userProfile, isError, navigate, dispatch]);

  // // Show loading state while fetching profile
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  const [shouldFetchFare, setShouldFetchFare] = useState(false);

  const { data: fareData, isLoading: isFareLoading, refetch: fetchFare } = useGetFareQuery(
    { pickup: address.pickup, destination: address.destination },
    { skip: !shouldFetchFare }
  );

  useEffect(() => {
    if (shouldFetchFare) {
      fetchFare();
      setShouldFetchFare(false);
    }
  }, [shouldFetchFare, fetchFare]);

  const [createRide, { data: rideData, isLoading: isRideLoading }] = useCreateRideMutation({ pickup: address.pickup, destination: address.destination, vehicleType: vehicleType });

  const socket = useSelector((state) => state.socket.socket);
  const userId = useSelector((state) => state.user.user._id);
  const userType = 'user'; // Assuming the userType is always 'user' for this component

  useEffect(() => {
    if (socket && userId) {
      dispatch(sendMessage({ eventName: 'join', message: { userId, userType } }));
    }
  }, [socket, userId, dispatch]);

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

  const changeHandler = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setActiveInput(e.target.name);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (address.pickup && address.destination) {
      setLocationPanelOpen(false);
      setShouldFetchFare(true);
      setVehiclePanelOpen(true);
    } else {
      toast.success("Please fill both pickup and destination fields.");
    }
  };

  const confirmRideHandler = () => {
    if (vehicleType && address.pickup && address.destination) {
        createRide({ 
            pickup: address.pickup, 
            destination: address.destination, 
            vehicleType: vehicleType 
        }); // Pass the required properties here
        setVehiclePanelOpen(false);
        setSearchingDriver(true);
    } else {
        toast.error("Please select a vehicle and ensure all fields are filled.");
    }
  };

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
            <button type="submit" disabled={!address.pickup || !address.destination} className={`bg-neutral-500 w-full text-lg font-semibold rounded-lg py-1 mt-3 disabled:cursor-not-allowed disabled:bg-neutral-400`}>Search</button>
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
            destination={address.destination}
            activeInput={activeInput}
            setAddress={setAddress}
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
          createRide={confirmRideHandler} // Pass the updated handler
          fareData={fareData}
          setVehicleType={setVehicleType}
          vehicleType={vehicleType}
        />
      </div>

      {/* Driver Searching */}
      <div ref={searchingDriverRef}
        className='fixed translate-y-full bottom-0 bg-white rounded-t-3xl  w-screen'>
        <SearchingDriverComponent
          setSearchingDriver={setSearchingDriver}
          setConfirmRide={setConfirmRide}
          searchingDriver={searchingDriver}
          address={address} />
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
