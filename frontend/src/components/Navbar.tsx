// React imports
import type { JSX } from 'react'
// React Router DOM
import { useNavigate } from 'react-router-dom'
// Context-related imports
import { useAppContext } from '../context/hooks/useAppContext';
// Axios imports
import axios from 'axios';
// React icons
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
// Utility imports
import { toast } from 'react-toastify'


const Navbar = (): JSX.Element => {

  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useAppContext()

  const sendVerificationOtp = async (): Promise<void> => {
    try {
      axios.defaults.withCredentials = true

      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`)
      if(data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      if(error instanceof Error) {
        console.error(`Error sending verification OTP: ${error.message}`)
        toast.error(error.message)
      } else {
        console.error(`Error sending verification OTP: ${error}`)
        toast.error('Error sending verification OTP.')
      }
    }
  }

  const logout = async (): Promise<void> => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`)
      if(data.success) {
        setIsLoggedIn(false)
        setUserData(null)
        toast.success(data.message)
        navigate('/')
      }
    } catch(error) {
      console.error(`Error on logout: ${error instanceof Error ? error.message : error}`)
      if(error instanceof Error) {
        toast(error.message)
      } else {
        toast('Error on logout')
      }
    }
  }

  const loggedUserMenu: JSX.Element = (
    <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
      {userData?.name[0].toUpperCase()}
      <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
        <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
          {!userData?.isAccountVerified && (
            <li
              className='py-1 px-2 hover:bg-gray-200 cursor-pointer'
              onClick={sendVerificationOtp}
            >
              Verify Email
            </li>
          )}
          <li
            className='flex items-center gap-2 py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'
            onClick={logout}
          >
            Logout <FiLogOut />
          </li>
        </ul>
      </div>
    </div>
  )

  const loginButton: JSX.Element = (
    <button
      className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 cursor-pointer hover:bg-gray-100 transition-all'
      onClick={()=> navigate('/login')}
    >
      Login <FiLogIn />
    </button>
  )

  return (
    <nav className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img
        src='/icons/logo.png'
        alt="logo"
        className='w-14 sm:w-18'
      />
      { userData ? ( loggedUserMenu ) : ( loginButton ) }
    </nav>
  )
}

export default Navbar