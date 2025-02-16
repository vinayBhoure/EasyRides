import React, { useState } from 'react'
import Uberpng from '../assets/pngegg.png'
import { NavLink } from 'react-router'

export default function UserLogin() {

    const [userLoginInfo, setUserLoginInfo] = useState({
        userEmail: '',
        userPassword: '',
    });

    const changeHandler = (e) => {
        setUserLoginInfo({
            ...userLoginInfo,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('user information:', userLoginInfo)
        setUserLoginInfo({
            userEmail: '',
            userPassword: ''
        })
    }

    return (
        <div className='h-screen w-full p-7 flex flex-col gap-7 justify-between'>
            <div className=''>
                <img
                    src={Uberpng} alt=''
                    className='w-30'
                />
                <form
                    onSubmit={(e) => submitHandler(e)}
                >
                    <h3 className='text-xl mb-2 font-medium'>What's your email?</h3>

                    <input
                        required
                        name='userEmail'
                        value={userLoginInfo.userEmail}
                        onChange={(e) => changeHandler(e)}
                        type='email'
                        placeholder='vinay@example.com'
                        className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
                    ></input>

                    <h3 className='text-xl mb-2 font-medium' >Enter Password</h3>

                    <input
                        required
                        name='userPassword'
                        value={userLoginInfo.userPassword}
                        onChange={(e) => changeHandler(e)}
                        type='password'
                        placeholder='password'
                        className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
                    ></input>
                    <br></br>
                    <button
                        type='submit'
                        className='bg-[#111] text-white py-2 px-4 mb-7 w-full rounded text-xl font-semibold '>
                        Login
                    </button>
                    <p className='text-lg'>Don't have account?
                        <NavLink
                            to={'/user/register'}
                            className='ml-1 text-blue-500 font-medium active:text-blue-700'
                        >
                            Create Account
                        </NavLink>
                    </p>
                </form>
            </div>
            <div className='bg-orange-400 p-3 rounded-md text-xl text-center font-bold text-white'>
                <NavLink to={'/captain/login'} >
                    <h3>Login as Captain</h3>
                </NavLink>
            </div>
        </div>
    )
}
