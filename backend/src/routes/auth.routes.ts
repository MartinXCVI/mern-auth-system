import { Router } from 'express'
import { login, logout, register } from '../controllers/auth.controllers.js'

// Router setup
const authRouter = Router()

/* POST routes */
// Registering a new user
authRouter.post('/register', register)
// Log in an existing user
authRouter.post('/login', login)
// Log out a user
authRouter.post('/logout', logout)

export default authRouter