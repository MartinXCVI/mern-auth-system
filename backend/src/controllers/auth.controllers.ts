// ENVIRONMENT VARIABLES
import { JWT_SECRET, JWT_REFRESH_SECRET, NODE_ENV, SALT_ROUNDS } from "../config/env.js"
import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from "../models/User.model.js"
import validator from 'validator'


/*
* @desc: Register a new user
* @route: /api/auth/register
* @method: POST
* @access: Public
*/
export const register = async (req: Request, res: Response): Promise<void> => {
  // Getting data from request's body
  const { name, email, password } = req.body
  /* Validations */
  if(!name || !email || !password) {
    res.status(400).json({
      success: false,
      message: "All fields are required."
    })
    return
  }
  if(!validator.isEmail(email)) {
    res.status(400).json({
      success: false,
      message: "Invalid email format"
    })
    return
  }
  // Attempting to register user
  try {
    // Checking if the email is already in use
    const existingUser = await UserModel.findOne({ email })
    if(existingUser) {
      res.status(400).json({
        success: false,
        message: "Email is already registered"
      })
      return
    }
    // Hashing the password w/ bcrypt
    const saltRounds: number = SALT_ROUNDS || 10
    const salt: string = await bcrypt.genSalt(saltRounds)
    const hashedPassword: string = await bcrypt.hash(password, salt)
    // Creating the user
    const user = new UserModel({ name, email, password: hashedPassword})
    const createdUser = await user.save()
    /* Handling tokens and cookies */
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10m' })
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 10 * 60 * 1000 // 10 minutes
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    // Sending response without user's password
    const { password: _, ...newUser } = createdUser.toObject()
    res.status(201).json({
      success: true,
      message: `User ${createdUser.name} successfully created`,
      user: newUser
    })
  } catch(error: unknown) {
    console.error(`Error registering user: ${error instanceof Error ? error.message : error}`)
    res.status(500).json({
      success: false,
      message: "Internal server error while attempting to register user.",
      error: error instanceof Error ? error.message : error
    })
  }
  return
} // End of register controller

/*
* @desc: Log in an existing user
* @route: /api/auth/login
* @method: POST
* @access: Public
*/
export const login = async (req: Request, res: Response): Promise<void> => {
  // Getting data from request's body
  const { email, password } = req.body
  /* Input validation */
  if(!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email and password are required"
    })
    return
  }
  // Attempting to login
  try {
    /* Email/Password validations */
    const user = await UserModel.findOne({ email })

    if(!user) {
      res.status(404).json({
        success: false,
        message: "Invalid credentials"
      })
      return
    }
    const passwordsMatch = await bcrypt.compare(password, user?.password)
    if(!passwordsMatch) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid credentials"
      })
      return
    }
    // Generating access token if all's correct
    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10m' })
    // Generating refresh token
    const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 10 * 60 * 1000 // 10 minutes
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    // Successful login
    res.status(200).json({
      success: true,
      message: `User ${user.name} successfully logged in` || "User successfully logged in",
      accessToken: accessToken
    })
    return
  } catch(error: unknown) {
    console.error(`Login error: ${error instanceof Error ? error.message : error}`)
    res.status(500).json({
      success: false,
      message: "Internal server error while attempting to login in",
      error: error instanceof Error ? error.message : error
    })
  }
} // End of login controller


/*
* @desc: Log out a user
* @route: /api/auth/logout
* @method: POST
* @access: Private
*/
export const logout = async (req: Request, res: Response): Promise<void> => {
  // Attempting to logout
  try {
    // Checking if the user's already logged out
    if(!req.cookies?.accessToken && !req.cookies?.refreshToken) {
      res.status(400).json({
        success: false,
        message: "No session found to log out"
      })
      return
    }
    // Clearing the cookies
    const cookieOptions: object = {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      path: '/'
    }
    res.clearCookie('accessToken', cookieOptions)
    res.clearCookie('refreshToken', cookieOptions)
    // Successful logout
    res.status(200).json({
      success: true,
      message: "User successfully logged out. All cookies were cleared!"
    })
  } catch(error: unknown) {
    console.error(`Error during logout: ${error instanceof Error ? error.message : error}`, {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date(),
      stack: error instanceof Error ? error.stack : undefined
    })
    res.status(500).json({
      success: false,
      message: "Internal server error during logout",
      error: error instanceof Error ? error.message : error
    })
  }
  return
}