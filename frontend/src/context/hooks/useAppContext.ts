import { useContext } from 'react'
import { AppContext } from '../AppContext'
import type { IAppContext } from '../../interfaces/IAppContext'

export const useAppContext = (): IAppContext => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used inside an AppContextProvider')
  }
  return context
}