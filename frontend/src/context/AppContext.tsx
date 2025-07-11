// React imports
import { createContext } from "react"
// Types & Interfaces
import type { IAppContext } from "../interfaces/IAppContext"


export const AppContext = createContext<IAppContext | undefined>(undefined)