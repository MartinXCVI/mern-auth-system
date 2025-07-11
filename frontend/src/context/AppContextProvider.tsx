// React imports
import type { ReactNode } from 'react'
// React hook imports
import { useEffect, useState } from 'react'
// Context-related imports
import { AppContext } from './AppContext'
// Types/Interfaces imports
import type { IUserData } from '../interfaces/IUserData'
// Utilities imports
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'


interface IAppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider = ({ children }: IAppContextProviderProps)=> {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUserData | null>(null)

  const getAuthState = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true
      })
      if(data.success) {
        setIsLoggedIn(true)
        getUserData()
      }
    } catch(error) {
      const err = error as AxiosError

      if(err.response?.status === 401) {
        setIsLoggedIn(false)
        console.info('User is not logged in.')
      } else {
        console.error(`Error while retrieving the user's authentication state: ${error instanceof Error ? error.message : error}`)
        toast.error("Error while retrieving the user's authentication state. Something went wrong while checking your session.")
      }
    }
  }

  // Check auth state whenever the page loads
  useEffect(()=> {
    getAuthState()
    // eslint-disable-next-line
  }, [])

  const getUserData = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data` ,{
        withCredentials: true
      })
      if(data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      console.error(`Error on retrieving user's data: ${error instanceof Error ? error.message : error}`)
      const err = error as AxiosError<{ message: string }>
      if(err.response?.data?.message) {
        toast.error(err.response.data.message)
      } else {
        toast.error('Something went wrong while retrieving user\'s data.')
      }
    }
  }

  const value = {
    backendUrl,
    isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    getUserData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}