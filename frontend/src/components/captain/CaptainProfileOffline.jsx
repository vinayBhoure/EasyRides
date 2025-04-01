import React, { useEffect, useMemo, useState } from 'react'
import { RxAvatar } from "react-icons/rx";
import { LuNotebookText } from "react-icons/lu";
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getSocketInstance } from '../../redux/reducer/socketReducer';

function CaptainProfileOffline({ setExploreRide, setIsOffline }) {

    const captainInfo = useSelector((state) => state.captain.captain);

    const fullname = captainInfo?.fullname?.firstname + " " + captainInfo?.fullname?.lastname;
    const [status, setStatus] = useState(captainInfo?.status);

    const statusHandler = async () => {
        try {
            const token = localStorage.getItem('tokenC');
            const res = await fetch('http://localhost:5000/api/v1/captains/update-status', {
                'method': 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    toast.success('Status updated successfully');
                } else {
                    toast.error(data.message || 'Failed to update status');
                }
            } else {
                toast.error('Failed to update status');
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const socket = getSocketInstance();
        if (socket) {
            socket.on('status-updated', (data) => {
                toast.success('Status updated successfully');
                console.log(data);
            })
        }

        return () => {
            socket.off('status-updated');
        }
    }, [])
    return (
        <div>
            <div className='bg-gray-300 h-2 w-16 rounded-4xl mx-auto mb-2'></div>
            <div className='flex items-center gap-3'>
                <RxAvatar size={'3rem'} />
                <div className='text-left'>
                    <h2 className='text-xl font-semibold'>{fullname}</h2>
                    <p className='text-gray-500'><span className={`w-2 h-2 mr-1 rounded-full inline-block ${status === 'inactive' ? 'bg-red-500' : 'bg-green-500'} `}></span>{status}</p>
                </div>
                <div className='ml-auto text-right'>
                    <h2 className='text-xl font-semibold'>Rs. 179</h2>
                    <p className='text-gray-500'>Earned</p>
                </div>
            </div>

            <div className='rounded-2xl py-5 w-full bg-amber-300 flex justify-around mt-5'>
                <div className='text-center'>
                    <LuNotebookText className='mx-auto' size={'2rem'} />
                    <h2 className='text-xl font-semibold'>10Km</h2>
                    <p>Total Distance</p>
                </div>
                <div className='text-center'>
                    <LuNotebookText className='mx-auto' size={'2rem'} />
                    <h2 className='text-xl font-semibold'>10Km</h2>
                    <p>Total Distance</p>
                </div>
                <div className='text-center'>
                    <LuNotebookText className='mx-auto' size={'2rem'} />
                    <h2 className='text-xl font-semibold'>10Km</h2>
                    <p>Total Distance</p>
                </div>
            </div>
            <button
                onClick={statusHandler}
                className={`w-full mt-5 py-2 text-center rounded-md text-xl text-white font-semibold ${status === 'active' ? 'bg-red-500' : 'bg-green-500'
                    }`}
            >
                {status === 'active' ? 'Go Offline' : 'Go Online'}
            </button>
        </div>
    )
}

export default CaptainProfileOffline
