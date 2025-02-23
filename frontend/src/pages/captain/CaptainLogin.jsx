import React from 'react'
import Uberpng from '../../assets/pngegg.png'
import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginCaptainMutation } from '../../redux/api/captainAPI'
import { captainExist } from '../../redux/reducer/captainReducer'
import toast from 'react-hot-toast'

function CaptainLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginCaptain, { isLoading, isError }] = useLoginCaptainMutation();

    const [captainLoginInfo, setCaptainLoginInfo] = useState({
        captainEmail: '',
        captainPassword: '',
    });

    const changeHandler = (e) => {
        setCaptainLoginInfo({
            ...captainLoginInfo,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await loginCaptain({
                email: captainLoginInfo.captainEmail,
                password: captainLoginInfo.captainEmail
            })


            dispatch(captainExist({
                captain: res.captain,
                token: res.token
            }))
            localStorage.setItem('tokeknC', res.token)
            setCaptainLoginInfo({
                captainEmail: '',
                captainPassword: ''
            })
            toast.success('captain login successfully')
            navigate('/captain/home')

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='h-screen w-full p-7 flex flex-col justify-between'>
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
                        name='captainEmail'
                        value={captainLoginInfo.userEmail}
                        onChange={(e) => changeHandler(e)}
                        type='email'
                        placeholder='vinay@example.com'
                        className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                    focus:ring focus:ring-blue-300 focus:border-transparent'
                    ></input>

                    <h3 className='text-xl mb-2 font-medium' >Enter Password</h3>

                    <input
                        required
                        name='captainPassword'
                        value={captainLoginInfo.userEmail}
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
                            to={'/captain/register'}
                            className='ml-1 text-blue-500 font-medium active:text-blue-700'
                        >
                            Create Account
                        </NavLink>
                    </p>
                </form>
            </div>
            <div className='bg-green-400 p-3 rounded-md text-xl text-center font-bold text-white'>
                <NavLink to={'/user/login'} >
                    <h3>Login as User</h3>
                </NavLink>
            </div>
        </div>
    )
}

export default CaptainLogin
