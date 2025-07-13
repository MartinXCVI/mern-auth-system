// React imports
import type { JSX, ChangeEvent, FormEvent, KeyboardEvent, ClipboardEvent } from 'react'
// React hooks
import { useEffect, useRef } from 'react';
// React Router DOM
import { useNavigate } from 'react-router-dom';
// Axios imports
import axios from 'axios';
// Context-related imports
import { useAppContext } from '../../context/hooks/useAppContext';
// React icons
import { MdOutlineMarkEmailRead } from "react-icons/md";
// Utility imports
import { toast } from 'react-toastify'


const EmailVerifyForm = (): JSX.Element => {

  const navigate = useNavigate()
    
  const { backendUrl, isLoggedIn, userData, getUserData } = useAppContext()
  const inputRefs = useRef<HTMLInputElement[]>([])

  const handleInput = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = event.target.value
    // Allowing only digits
    if(!/^\d*$/.test(value)) {
      event.target.value = ''
      return
    }
    if(value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number): void => {
    if(event.key === 'Backspace' && event.currentTarget.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const paste = event.clipboardData.getData('text').trim()
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index)=> {
      if(index < inputRefs.current.length && inputRefs.current[index]) {
      inputRefs.current[index].value = char;

        if(index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    })  
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      const otpArray = inputRefs.current.map(event => event?.value || '')
      const otp = otpArray.join('')

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-email`, { otp }, {
        withCredentials: true
      })
      if(data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      console.error(`Error on email verification: ${error instanceof Error ? error.message : error}`)
      if(axios.isAxiosError(error)){
        toast(error.response?.data?.message || error.message)
      } else if(error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unexpected error on email verification. Try again later.')
      }
    }
  }

  useEffect((): void => {
    if(isLoggedIn && userData && userData.isAccountVerified) {
      navigate('/')
    }
  }, [isLoggedIn, userData, navigate])

  
  return (
    <form
      className='bg-[#10241b] p-8 rounded-lg shadow-lg w-96 text-sm'
      onSubmit={handleSubmit}
    >
      <h1
        className='text-white text-2xl font-semibold text-center mb-4'
      >
        Email Verify OTP
      </h1>
      <p className='text-center mb-6 text-indigo-300'>
        Enter the 6 digits code sent to your email
      </p>
      <div className='flex justify-between mb-8' onPaste={handlePaste}>
        {Array(6).fill(0).map((_, index)=> (
          <label htmlFor={`verify-otp-input-${index}`} key={index}>
            <input
              type="text"
              inputMode='numeric'
              pattern='[0-9]*'
              className='w-12 h-12 bg-[#333a5c] text-white text-center text-xl rounded-md'
              id={`verify-otp-input-${index}`}
              maxLength={1}
              ref={(event)=> { if(event) inputRefs.current[index] = event }}
              onChange={(event)=> handleInput(event, index)}
              onKeyDown={(event)=> handleKeyDown(event, index)}
              required
              autoComplete="one-time-code"
            />
          </label>
        ))}
      </div>
      <button
        type='submit'
        className='w-full flex justify-center items-center gap-1 py-3 text-white rounded-full bg-gradient-to-l from-teal-500 to-emerald-600 font-medium'
      >
        Verify Email <MdOutlineMarkEmailRead />
      </button>
    </form>
  )
}

export default EmailVerifyForm