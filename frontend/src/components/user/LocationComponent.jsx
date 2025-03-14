import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { useGetSuggestionsQuery } from '../../redux/api/mapAPI';

function LocationComponent({ pickup, destination, activeInput, setAddress, setLocationPanelOpenFunc, setVehiclePanelOpenFunc }) {

    const [searchTerm, setSearchTerm] = useState('');

    const { data: suggestions, isError, isLoading } = useGetSuggestionsQuery(searchTerm, {
        skip: !searchTerm
    });

    useEffect(() => {
        let timer;
        if (activeInput === 'pickup') {
            timer = setTimeout(() => {
                setSearchTerm(pickup);
            }, 500);
        } else if (activeInput === 'destination') {
            timer = setTimeout(() => {
                setSearchTerm(destination);
            }, 500);
        }

        return () => {
            clearTimeout(timer);
        }
    }, [pickup, destination, activeInput]);

    const clickHandler = (suggestion) => {
        setAddress((prev) => ({
            ...prev,
            [activeInput]: suggestion.mainText
        }));
        setLocationPanelOpenFunc(false);
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className=''>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error loading suggestions</p>}
                {suggestions && suggestions.suggestions.map((item, idx) => (
                    <div
                        onClick={() => clickHandler(item)}
                        key={idx} className='flex justify-start border-2 border-transparent rounded-xl p-1 active:border-black items-center gap-4 mt-3'>
                        <div className='bg-[#eee] p-3 rounded-xl'>
                            <FaLocationDot />
                        </div>
                        <div>
                            <h4 className='text-lg'>{item.mainText}</h4>
                            <p className='text-sm text-gray-500'>{item.secondaryText}</p>
                        </div>
                    </div>
                ))}
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