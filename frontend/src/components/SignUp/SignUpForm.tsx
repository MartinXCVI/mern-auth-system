// React imports
import type { JSX, ChangeEvent, FormEvent } from 'react'
// React hooks
import { useState } from 'react';
// React Router imports
import { useNavigate } from 'react-router-dom';
// Context-related imports
import { useAppContext } from '../../context/hooks/useAppContext';
// React icons
import { FaRegUser } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
// Utilities imports
import axios from 'axios';
import { toast } from 'react-toastify'


const SignUpForm = (): JSX.Element => {

  const navigate = useNavigate()

  const { backendUrl } = useAppContext()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmitRegisterHandler = async (event: FormEvent): Promise<void> => {
    try {
      event.preventDefault()
      // Sending cookies with the request
      axios.defaults.withCredentials = true

      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password
      })
      // Validating
      if(data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={onSubmitRegisterHandler}>
        {/* FULL NAME INPUT */}
        <div className='w-full flex items-center gap-3 mb-4 px-4 py-2.5 rounded-full bg-gray-800'>
          <label htmlFor="fullname-signup" className='min-w-[35%] flex items-center gap-1'>
            <FaRegUser aria-hidden="true" /> Full name
          </label>
          <input
            type="text"
            id="fullname-signup"
            className='max-w-[65%] bg-transparent outline-none'
            placeholder='Enter your full name'
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setName(event.target.value)}
            value={name}
            required
          />
        </div>
        
        {/* EMAIL INPUT */}
        <div className='w-full flex items-center gap-3 mb-4 px-4 py-2.5 rounded-full bg-gray-800'>
          <label htmlFor="email-signup" className='min-w-[35%] flex items-center gap-1'>
            <BsEnvelope aria-hidden="true" /> Email
          </label>
          <input
            type="email"
            id="email-signup"
            className='max-w-[65%] bg-transparent outline-none'
            placeholder='Enter your email'
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
            value={email}
            required
          />
        </div>
        {/* FULL NAME INPUT */}
        <div className='w-full flex items-center gap-3 mb-4 px-4 py-2.5 rounded-full bg-gray-800'>
          <label htmlFor="password-signup" className='min-w-[35%] flex items-center gap-1'>
            <IoIosLock aria-hidden="true" /> Password
          </label>
          <input
            type="password"
            id="password-signup"
            className='max-w-[65%] bg-transparent outline-none'
            placeholder='Enter your password'
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setPassword(event.target.value)}
            value={password}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full flex justify-center items-center gap-1 py-2.5 mt-10 rounded-full text-gray-200 bg-gradient-to-l from-teal-500 to-emerald-600 font-medium'
        >
          Sign Up <BsPencilSquare aria-hidden="true" />
        </button>
      </form>
        <p className='text-start text-gray-400 text-xs mt-4'>
          Already have an account? —{' '}
          <span
            role='button'
            onClick={()=> navigate('/login')}
            className='text-emerald-400 cursor-pointer underline'
          >
            Login Here
          </span>
        </p>
    </>
  )
}

export default SignUpForm