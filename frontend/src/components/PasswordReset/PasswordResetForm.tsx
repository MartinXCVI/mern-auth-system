// React imports
import type { JSX, FormEvent, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react'
// React hooks
import { useState, useRef } from 'react'
// Context-related imports
import { useAppContext } from '../../context/hooks/useAppContext';
// Axios
import axios from 'axios';
// React Router DOM
import { useNavigate } from 'react-router-dom';
// React icons
import { BsEnvelope } from 'react-icons/bs'
import { IoIosSend } from "react-icons/io";
import { IoIosLock } from 'react-icons/io';
// Utility imports
import { toast } from 'react-toastify';


const PasswordResetForm = (): JSX.Element => {

  const navigate = useNavigate()
  const { backendUrl } = useAppContext()

  const [email, setEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [isOtpSubmitted, setIsOtpSubmitted] = useState<boolean>(false)

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

  const onSubmitEmail = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email}, {
        withCredentials: true
      })
      if(data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
      if(data.success) setIsEmailSent(true)
    } catch(error) {
      console.error(`Error on email submitted: ${error instanceof Error ? error.message : error}`)
      if(axios.isAxiosError(error)){
        toast(error.response?.data?.message || error.message)
      } else if(error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unexpected error on email submission. Try again later.')
      }
    }
  }

  const onSubmitOtp = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const otpArray = inputRefs.current.map(event => event.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  }

  const onSubmitNewPassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email, otp, newPassword }, { withCredentials: true }
      )
      if(data.success) {
        toast.success(data.message)
        navigate('/login')
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      console.error(`Error on new password submission: ${error instanceof Error ? error.message : error}`)
      if(axios.isAxiosError(error)){
        toast(error.response?.data?.message || error.message)
      } else if(error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unexpected error on new password submission. Try again later.')
      }
    }
  }


  return (
    <>
    {/* STEP 1: PASSWORD FORM */}
    {!isEmailSent && !isOtpSubmitted && (
      <form
        className='bg-[#10241b] p-8 rounded-lg shadow-lg w-96 text-sm'
        onSubmit={onSubmitEmail}
      >
        <h1
          className='text-white text-2xl font-semibold text-center mb-4'
        >
          Reset Password
        </h1>
        <p className='text-center mb-6 text-indigo-300'>
          Enter your email address
        </p>
        <div className='w-full flex items-center gap-3 px-5 py-2.5 rounded-full mb-4 bg-gray-800'>
          <label htmlFor="email-reset-password" className="flex items-center gap-2 w-full text-white">
            <BsEnvelope aria-hidden="true" />
            <input
              type="email"
              id="email-reset-password"
              className='bg-transparent outline-none text-white'
              aria-label="Email address input field"
              placeholder='Enter your email'
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => setEmail(event.target.value)}
              required
            />
          </label>
        </div>
        <button
          className='w-full flex justify-center items-center gap-1 py-2.5 rounded-full text-gray-200 bg-gradient-to-l from-teal-500 to-emerald-600 font-medium'
          type='submit'
        >
          Submit <IoIosSend />
        </button>
      </form>
    )}

    {/* STEP 2: OTP FORM */}
    {isEmailSent && !isOtpSubmitted && (
      <form
        className='bg-[#10241b] p-8 rounded-lg shadow-lg w-96 text-sm'
        onSubmit={onSubmitOtp}
      >
        <h1
          className='text-white text-2xl font-semibold text-center mb-4'
        >
          Reset Password OTP
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
                aria-label={`OTP digit ${index + 1}`}
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
          className='w-full flex justify-center items-center gap-1 py-2.5 text-white rounded-full bg-gradient-to-l from-teal-500 to-emerald-600 font-medium'
        >
          Submit <IoIosSend />
        </button>
      </form>
    )}

      {/* STEP 3: NEW PASSWORD FORM */}
    {isEmailSent && isOtpSubmitted && (
      <form
        className='bg-[#10241b] p-8 rounded-lg shadow-lg w-96 text-sm'
        onSubmit={onSubmitNewPassword}
      >
        <h1
          className='text-white text-2xl font-semibold text-center mb-4'
        >
          New Password
        </h1>
        <p className='text-center mb-6 text-indigo-300'>
          Enter the new password below
        </p>
        <div className='w-full flex items-center gap-3 px-5 py-2.5 rounded-full mb-4 bg-gray-800'>
          <label htmlFor="new-password" className="flex items-center gap-2 w-full text-white">
            <IoIosLock aria-hidden="true" />
            <input
              type="password"
              id="new-password"
              className='bg-transparent outline-none text-white'
              aria-label="New password input field"
              placeholder='Enter your new password'
              value={newPassword}
              onChange={(event: ChangeEvent<HTMLInputElement>): void => setNewPassword(event.target.value)}
              required
            />
          </label>
        </div>
        <button
          className='w-full flex justify-center items-center gap-1 py-2.5 rounded-full text-gray-200 bg-gradient-to-l from-teal-500 to-emerald-600 font-medium'
          type='submit'
        >
          Submit <IoIosSend />
        </button>
      </form>
    )}
    </>
  )
}

export default PasswordResetForm