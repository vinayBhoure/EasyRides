import React from 'react'
import Uberpng from '../../assets/pngegg.png'
import { NavLink, useNavigate } from 'react-router'
import { useState } from 'react'
import { useRegisterCaptainMutation } from '../../redux/api/captainAPI'
import { useDispatch } from 'react-redux'
import { captainExist } from '../../redux/reducer/captainReducer'
import toast from 'react-hot-toast'

function CaptainSignUp() {

  const [registerCaptain, { isLoading, isError }] = useRegisterCaptainMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [captainSignUpInfo, setCaptainSignUpInfo] = useState({
    firstname: '',
    lastname: '',
    captainEmail: '',
    captainPassword: '',
    confirmPassword: '',
    vehicleColor: "",
    capacity: "",
    vehicleNumber: "",
    vehicleType: ""
  });

  const changeHandler = (e) => {
    setCaptainSignUpInfo({
      ...captainSignUpInfo,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (captainSignUpInfo.captainPassword !== captainSignUpInfo.confirmPassword) {
      alert('Please enter the same password');
      return
    }
    try {
      const newCaptain = {
        fullname: {
          firstname: captainSignUpInfo.firstname,
          lastname: captainSignUpInfo.lastname
        },
        email: captainSignUpInfo.captainEmail,
        password: captainSignUpInfo.captainPassword,
        vehicle: {
          color: captainSignUpInfo.vehicleColor,
          number_plate: captainSignUpInfo.vehicleNumber,
          capacity: captainSignUpInfo.capacity,
          type: captainSignUpInfo.vehicleType
        },
        location: {
          latitude: null,
          longitude: null,
        }
      }
      const res = await registerCaptain(newCaptain);

      if (res.success === "true") {
        dispatch(captainExist({
          captain: res.newCaptain,
          token: res.token
        }))
        localStorage.setItem('tokenC', res.token)
        setCaptainSignUpInfo({
          firstname: '',
          lastname: '',
          captainEmail: '',
          captainPassword: '',
          confirmPassword: '',
          vehicleColor: "",
          capacity: "",
          vehicleNumber: "",
          vehicleType: ""
        })
        toast.success('Captain registered successfully')
        navigate('/captain/home')
      } else {
        console.log('login failed');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='min-h-screen w-full p-7 flex flex-col gap-7 justify-between '>
      <div>

        <img
          src={Uberpng} alt=''
          className='w-30'
        />

        <form
          onSubmit={(e) => submitHandler(e)}
        >

          <h3 className='text-xl mb-2 font-medium'>What's your name?</h3>

          <div className='flex gap-7'>
            <input
              required
              name='firstname'
              value={captainSignUpInfo.firstname}
              onChange={(e) => changeHandler(e)}
              type='text'
              placeholder='Firstname'
              className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
            ></input>

            <input
              required
              name='lastname'
              value={captainSignUpInfo.lastname}
              onChange={(e) => changeHandler(e)}
              type='text'
              placeholder='Lastname'
              className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
            ></input>
          </div>

          <h3 className='text-xl mb-2 font-medium'>Enter Email</h3>

          <input
            required
            name='captainEmail'
            value={captainSignUpInfo.captainEmail}
            onChange={(e) => changeHandler(e)}
            type='email'
            placeholder='vinay@example.com'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>

          <h3 className='text-xl mb-2 font-medium'>Enter Password</h3>

          <input
            required
            name='captainPassword'
            value={captainSignUpInfo.captainPassword}
            onChange={(e) => changeHandler(e)}
            type='password'
            placeholder='password'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>

          <h3 className='text-xl mb-2 font-medium'>Confirm Password</h3>

          <input
            required
            name='confirmPassword'
            value={captainSignUpInfo.confirmPassword}
            onChange={(e) => changeHandler(e)}
            type='password'
            placeholder='password'
            className='bg-[#eee] py-2 px-4 mb-7 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
          ></input>

          <h3 className='text-xl mb-2 font-medium'>Vehicle Details</h3>

          <div className='flex gap-7 mb-7'>
            <div className='w-full'>

              <p className='mb-2'>Color</p>

              <select
                required
                name='vehicleColor'
                value={captainSignUpInfo.vehicleColor}
                onChange={(e) => changeHandler(e)}
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                            focus:ring focus:ring-blue-300 focus:border-transparent'>
                <option value={""} disabled className='text-xs font-semibold' >--Select--</option>
                {
                  ['red', 'blue', 'green', 'black'].map((color, idx) => {
                    const capitalized = color.charAt(0).toUpperCase() + color.slice(1);
                    return <option key={idx} className='text-xs font-semibold' value={color}>{capitalized}</option>
                  })
                }
              </select>

            </div>

            <div className='w-full'>

              <p className='mb-2'>Capcity</p>

              <select
                required
                name='capacity'
                value={captainSignUpInfo.capacity}
                onChange={(e) => changeHandler(e)}
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                            focus:ring focus:ring-blue-300 focus:border-transparent'
              >
                <option value={""} disabled className='text-xs font-semibold' >--Select--</option>
                {
                  [1, 2, 3, 4, 5, 7].map((item, idx) => {
                    return <option key={idx} className='text-xs font-semibold' value={item}>{item}</option>
                  })
                }

              </select>
            </div>
          </div>
          <div className='flex gap-7 mb-7'>
            <div className='w-full'>

              <p className='mb-2'>Vehicle No.</p>
              <input
                required
                type='text'
                name='vehicleNumber'
                value={captainSignUpInfo.vehicleNumber}
                onChange={(e) => changeHandler(e)}
                placeholder='AB-00-CD-1893'
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
              ></input>
            </div>
            <div className='w-full'>
              <p className='mb-2'>Type</p>
              <select
                required
                name='vehicleType'
                value={captainSignUpInfo.vehicleType}
                onChange={(e) => changeHandler(e)}
                className='bg-[#eee] py-2 px-4 w-full rounded border border-gray-300 text-lg placeholder:text-base
                      focus:ring focus:ring-blue-300 focus:border-transparent'
              >
                <option value={""} disabled className='text-xs font-semibold' >--Select--</option>
                {
                  ['auto', 'car', 'bike'].map((item, idx) => {
                    const capitalized = item.charAt(0).toUpperCase() + item.slice(1);
                    return <option key={idx} className='text-xs font-semibold' value={item}>{capitalized}</option>
                  })
                }
              </select>
            </div>
          </div>

          <button
            type='submit'
            className='bg-[#111] text-white py-2 px-4 mb-7 w-full rounded text-xl font-semibold '>
            SignUp
          </button>


        </form>
        <p className='text-lg '>Already have account?
          <NavLink
            to={'/captain/login'}
            className='ml-1 text-blue-500 font-medium active:text-blue-700'
          >
            Login here
          </NavLink>
        </p>
      </div>

      <div className='bg-green-400 p-3 rounded-md text-xl text-center font-bold text-white'>
        <NavLink to={'/user/register'} >
          <h3>SignUp as User</h3>
        </NavLink>
      </div>
    </div>
  )
}

export default CaptainSignUp
