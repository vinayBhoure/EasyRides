import React, { useEffect, useRef } from 'react'
import Passenger from '../../assets/vinay.jpg'
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { getSocketInstance } from '../../redux/reducer/socketReducer';

function CompleteRide({ ride }) {

  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (ride === undefined || ride === null) {
  //     toast.success('Ride not exisit');
  //     navigate('/captain/home', { replace: true });
  //   }
  // }, [ride, navigate]);

  const finishRideHandler = async () => {
    try {
      console.log('finish ride handler entered')
      const token = localStorage.getItem('tokenC');
      const res = await fetch('http://localhost:5000/api/v1/rides/endRide', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rideId: ride._id
        })
      })
      const data = await res.json();
      // setCompleteRidePanel(!completeRidePanel);
      // navigate('/captain/home', { replace: true });
      // window.history.replaceState(null, '', '/captain/home');
    } catch (err) {
      console.log(err);
    }
  }

  const fullname = ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname;
  const pickup = ride?.pickup || "Unknown Pickup Location";
  const destination = ride?.destination || "Unknown Destination";
  const fare = ride?.fare || "N/A";

  return (
    <div>
      <div className='flex gap-4 bg-gray-100 p-4 pt-6 shadow-md'>
        <img src={Passenger} className='w-16 h-16 rounded-lg' alt='' />
        <div className='w-full items-start'>
          <h2 className='text-lg text-gray-600'>Passenger</h2>
          <p className='text-2xl font-semibold'>{fullname}</p>
        </div>
      </div>

      <div className='flex flex-col gap-4 p-4'>
        <div className='flex justify-around'>
          <div>
            <h3 className='text-lg text-gray-600'>Time</h3>
            <h2 className='text-xl font-semibold'>5 min</h2>
          </div>
          <div>
            <h3 className='text-lg text-gray-600'>Distance</h3>
            <h2 className='text-xl font-semibold'>1.7 Km</h2>
          </div>
          <div>
            <h3 className='text-lg text-gray-600'>Amount</h3>
            <h2 className='text-xl font-semibold'>Rs. {fare}</h2>
          </div>
        </div>
        <div className='flex flex-col gap-4 py-2 text-xl font-semibold text-white'>
          <button
            onClick={finishRideHandler}
            className='w-full bg-green-500 py-3 rounded-md'> Finish Ride</button>
        </div>
      </div>
    </div>
  )
}

export default CompleteRide
