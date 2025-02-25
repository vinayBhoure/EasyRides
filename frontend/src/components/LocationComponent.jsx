import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";


function LocationComponent({ pickup, setLocationPanelOpenFunc, setVehiclePanelOpenFunc }) {

    const locationArr = [,

        '366, rishi palace colony, Near Hawa Bunglow, INdore, m.p. ',
        '366, rishi palace colony, Near Hawa Bunglow, INdore, m.p. ',
    ]

    const clickHandler = () => {
        if (pickup.length > 0) {
            setLocationPanelOpenFunc(false);
            setVehiclePanelOpenFunc(true);
        }
    }
    return (
        <div className='flex flex-col justify-between h-full'>
            <div className=''>
                {
                    locationArr.map((item, idx) => {
                        return (
                            <div
                                onClick={clickHandler}
                                key={idx} className='flex justify-start border-2 border-transparent rounded-xl p-1 active:border-black items-center gap-4 mt-3'>
                                <div className='bg-[#eee] p-3 rounded-xl'>
                                    <FaLocationDot />
                                </div>
                                <h4 className=' text-lg'>{item}</h4>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div className='flex justify-start border-2 border-transparent rounded-xl p-1 active:border-black items-center gap-4 mt-3'>
                    <div className='bg-[#eee] p-3 rounded-xl'>
                        <FaBookmark />
                    </div>
                    <h4 className=' text-lg'>Saved Place</h4>
                </div>
                <div className='flex justify-start border-2 border-transparent rounded-xl p-1 active:border-black items-center gap-4 mt-3'>
                    <div className='bg-[#eee] p-3 rounded-xl'>
                        <FaLocationDot />
                    </div>
                    <h4 className=' text-lg'>Set location on map</h4>
                </div>
            </div>
        </div>
    )
}

export default LocationComponent