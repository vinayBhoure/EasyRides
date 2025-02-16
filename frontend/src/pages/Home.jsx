import React from 'react'
import Uberpng from '../assets/pngegg.png'
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from 'react-router';

function Home() {

    const bgImg = 'https://plus.unsplash.com/premium_vector-1721722789631-84eed6cc72ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  return (
    <div>
      <div className={`bg-cover bg-[url(https://plus.unsplash.com/premium_vector-1721722789631-84eed6cc72ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col justify-between bg-red-300`}>
      <img 
      src={Uberpng} alt=''
        className='w-30'
      />
      <div className=' bg-white p-3 pb-7'>
        <h2 className='font-semibold text-3xl mb-4'>Get started with uber</h2>
        <NavLink to={'/user/login'} className='bg-black flex items-center justify-center gap-2 w-full font-medium text-xl text-white py-3 rounded-lg'>
        Continue
        <FaArrowRight className='inline' size={'1.25rem'} /></NavLink>
      </div>

      </div>
    </div>
  )
}

export default Home
