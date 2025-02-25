import React, { useEffect, useState } from 'react'
import RideDetail from './RideDetail';
import BlackCar from '../assets/blackCar.jpg'
import Moto from '../assets/moto.jpg'
import Auto from '../assets/auto.jpg'
import Car from '../assets/car.jpg'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";

function VehicleComponent({ setVehiclePaneOpen, setSearchingDriver }) {
    const [selectRide, setSelectRide] = useState('');

    return (
        <div>
            <div onClick={() => setVehiclePaneOpen(false)} className='h-2 mx-auto m-2 w-16 bg-gray-400 active:bg-gray-700 rounded-full'></div>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <RideDetail name={'UberGo'} setSelectRide={setSelectRide} imgSrc={Car} price={'150.75'} service={'UberGo'} capacity={4} />
            <RideDetail name={'Moto'} setSelectRide={setSelectRide} imgSrc={Moto} price={'49.3'} service={'Moto'} capacity={1} />
            <RideDetail name={'Auto'} setSelectRide={setSelectRide} imgSrc={Auto} price={'120.9'} service={'Auto'} capacity={3} />
            <RideDetail name={'Premier'} setSelectRide={setSelectRide} imgSrc={BlackCar} price={'200.00'} service={'Premier'} capacity={4} />
            <div className='border-t text-2xl'>
                <div className='flex justify-between items-center'>
                    <h3 className='flex items-center'> <FaMoneyBill className='mr-2' color='green' size={'1.5rem'} /> Cash</h3>                <MdKeyboardArrowRight />
                </div>
                <button
                    disabled={selectRide.length ? false : true}
                    onClick={() => {
                        setSearchingDriver(true)
                        setVehiclePaneOpen(false)
                    }}
                    className={` ${selectRide.length ? 'bg-neutral-800 text-white' : 'bg-neutral-400 text-amber-50'} font-semibold  w-full rounded-lg p-2 text-2xl `}>
                    Confirm {selectRide}
                </button>
            </div>
        </div>
    )
}

export default VehicleComponent
