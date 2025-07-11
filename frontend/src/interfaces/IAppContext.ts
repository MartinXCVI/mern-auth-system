// Types/Interfaces imports
import type { Dispatch, SetStateAction } from "react";
import type { IUserData } from "./IUserData"

export interface IAppContext {
  backendUrl: string;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  userData: IUserData | null;
  setUserData: Dispatch<SetStateAction<IUserData | null>>;
  getUserData: ()=> Promise<void>
}