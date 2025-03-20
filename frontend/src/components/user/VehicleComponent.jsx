import React, { useEffect, useState } from 'react'
import RideDetail from './RideDetail';
import BlackCar from '../../assets/blackCar.jpg'
import Moto from '../../assets/moto.jpg'
import Auto from '../../assets/auto.jpg'
import Car from '../../assets/car.jpg'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa";

function VehicleComponent({ setVehiclePaneOpen, setSearchingDriver, fareData, createRide, setVehicleType, vehicleType }) {

    const clickHandler = () => {
        createRide(); // Use the handler passed from the parent
    };

    return (
        <div>
            <div onClick={() => setVehiclePaneOpen(false)} className='h-2 mx-auto m-2 w-16 bg-gray-400 active:bg-gray-700 rounded-full'></div>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <RideDetail setVehicleType={setVehicleType} imgSrc={Car} price={fareData?.fare?.car} service={'Car'} capacity={4} />
            <RideDetail setVehicleType={setVehicleType} imgSrc={Moto} price={fareData?.fare?.bike} service={'Bike'} capacity={1} />
            <RideDetail setVehicleType={setVehicleType} imgSrc={Auto} price={fareData?.fare?.auto} service={'Auto'} capacity={3} />
            <div className='text-2xl mt-5'>
                <div className='flex justify-between items-center mb-5 border rounded p-2 bg-neutral-200'>
                    <h3 className='flex items-center'> <FaMoneyBill className='mr-2' color='green' size={'2rem'} /> Cash</h3>                <MdKeyboardArrowRight />
                </div>
                <button
                    disabled={vehicleType.length ? false : true}
                    onClick={clickHandler}
                    className={` ${vehicleType.length ? 'bg-neutral-800 text-white' : 'bg-neutral-400 text-amber-50'} font-semibold  w-full rounded-lg p-2 text-2xl `}>
                    Confirm {vehicleType}
                </button>
            </div>
        </div>
    )
}

export default VehicleComponent
