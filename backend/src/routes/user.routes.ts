/* MODULE IMPORTS */
import { Router } from 'express'
/* CONTROLLERS IMPORTS */
import { getUserData } from '../controllers/user.controllers.js'
/* MIDDLEWARE IMPORTS */
import userAuth from '../middlewares/userAuth.js'

// Router setup
const userRouter = Router()

/* GET routes */
// Retrieving logged user's data
userRouter.get('/data', userAuth, getUserData)

export default userRouter