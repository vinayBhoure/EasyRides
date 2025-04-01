import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmRide from '../../components/user/ConfirmRide';
import FinishRide from '../../components/user/FinishRide';
import VehicleComponent from '../../components/user/VehicleComponent';
import LocationComponent from '../../components/user/LocationComponent';
import SearchingDriverComponent from '../../components/user/SearchingDriverComponent';

import { userExist } from '../../redux/reducer/userReducer'
import { useLazyGetUserProfileQuery } from '../../redux/api/userAPI';
import { useCreateRideMutation, useGetFareQuery } from '../../redux/api/rideAPI';
import { initializeSocket, getSocketInstance } from '../../redux/reducer/socketReducer';

import Map from '../../assets/map.jpg'
import { MdTimer } from "react-icons/md";
import Uberpng from '../../assets/pngegg.png'
import { MdKeyboardArrowDown } from "react-icons/md";
import LiveTracking from '../../components/LiveTracking';

function UserHome() {

  const dispatch = useDispatch();
  const vehiclePanelOpenRef = useRef(null)
  const locationPanelOpenRef = useRef(null)
  const locationPanelCloseRef = useRef(null)
  const searchingDriverRef = useRef(null);
  const confirmRideRef = useRef(null);
  const finishRideRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const [searchingDriver, setSearchingDriver] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [finishRide, setFinishRide] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const [activeInput, setActiveInput] = useState(null);
  const [shouldFetchFare, setShouldFetchFare] = useState(false);

  const [address, setAddress] = useState({ pickup: '', destination: '' });
  const [rideDetail, setRideDetail] = useState({});

  const { data: fareData, isLoading: isFareLoading, refetch: fetchFare } = useGetFareQuery(
    { pickup: address.pickup, destination: address.destination },
    { skip: !shouldFetchFare }
  );
  const [createRide, { data: rideData, isLoading: isRideLoading }] = useCreateRideMutation({
    pickup: address.pickup,
    destination: address.destination,
    vehicleType: vehicleType
  });
  const [triggerUserProfile] = useLazyGetUserProfileQuery();

  const userType = 'user'; // Assuming the userType is always 'user' for this component
  const userId = useSelector((state) => state.user.user._id);
  const connected = useSelector((state) => state.socket.connected);

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

  useEffect(() => {
    if (shouldFetchFare) {
      fetchFare();
      setShouldFetchFare(false);
    }
  }, [shouldFetchFare, fetchFare]);

  useEffect(() => {
    const tokenU = localStorage.getItem('tokenU');
    if (tokenU) {
      triggerUserProfile().then(({ data }) => {
        if (data) {
          dispatch(userExist({ user: data.user, token: tokenU }));
        }
      });
    }
  }, [dispatch, triggerUserProfile]);


  useEffect(() => {
    dispatch(initializeSocket()); // Initialize the socket connection
  }, [dispatch]);

  useEffect(() => {
    if (connected && userId) {
      const socket = getSocketInstance(); // Get the socket instance
      if (socket) {
        socket.emit('join', { userId, userType }); // Use socket.emit directly
      }
    }
  }, [connected, userId]);

  useEffect(() => {
    const socket = getSocketInstance();
    if (socket) {
      socket.on('ride-confirmed', (data) => {
        setRideDetail(data.data);
        setSearchingDriver(false);
        setConfirmRide(true);
      })
    }

    return () => {
      socket.off('ride-confirmed');
    }
  }, [])

  useEffect(() => {
    const socket = getSocketInstance();
    if (socket) {
      socket.on('ride-started', (data) => {
        console.log('ride started');
        setRideDetail(data.data);
        setFinishRide(true);
        setConfirmRide(false);
      })
    }

    return () => {
      socket.off('ride-started');
    }
  }, [])

  useEffect(() => {
    const socket = getSocketInstance();
    if (socket) {
      socket.on('ride-completed', (data) => {
        console.log('ride completed', data);
        setFinishRide(false);
        window.location.reload();
      })
    }

    return () => {
      socket.off('ride-completed');
    }
  }, [])

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
    if (finishRideRef.current) {
      let anim = gsap.to(finishRideRef.current, {
        transform: finishRide ? 'translateY(0)' : 'translateY(100%)',
        paused: true
      })
      anim.play();
      return () => anim.kill();
    }
  }, [finishRide])

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

  return (
    <div className='h-screen w-screen relative overflow-hidden'>
      <img
        src={Uberpng} alt=''
        className='w-30 absolute top-0 left-0'
      />

      {/* background map image */}
      <div
        className='object-cover h-screen w-screen relative'>
        <div className="absolute inset-0 z-0">
          <LiveTracking containerStyle={{ height: '100%', width: '100%' }} />
        </div>
      </div>

      {/* Add pickup and destination */}
      <div
        className='max-h-screen w-full absolute bottom-0 flex flex-col justify-end'>
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
      <div
        ref={searchingDriverRef}
        className='fixed translate-y-full bottom-0 bg-white rounded-t-3xl  w-screen'>
        <SearchingDriverComponent
          setSearchingDriver={setSearchingDriver}
          address={address} />
      </div>

      {/* Confirm Ride  */}
      <div
        ref={confirmRideRef}
        className='absolute bottom-0 translate-y-full bg-white rounded-t-3xl w-screen'>
        <ConfirmRide
          rideDetail={rideDetail}
        />
      </div>

      <div
        ref={finishRideRef}
        className='absolute bottom-0 translate-y-full bg-white rounded-t-3xl w-screen'>
        <FinishRide
          rideDetail={rideDetail}
        />
      </div>

    </div>
  )
}

export default UserHome
