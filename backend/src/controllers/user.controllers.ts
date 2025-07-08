import { Request, Response } from "express";
import UserModel from "../models/User.model.js";
import { IRequestWithUser } from "../interfaces/IRequestWithUser.js";

/*
 * @desc: Get authenticated user's basic data
 * @route: /api/user/data
 * @method: GET
 * @access: Private
 */
export const getUserData = async (req: IRequestWithUser, res: Response): Promise<void> => {
  // Attempting to get user data
  try {
    // Getting user id from the token & validating
    const userId = req.user?.id
    if(!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Missing user ID from session"
      })
      return
    }
    // Fetching user from DB
    const user = await UserModel.findById(userId)
    if(!user) {
      res.status(404).json({
        success: false,
        message: "User not found or does not exist"
      })
      return
    }
    // Successful response
    res.status(200).json({
      success: true,
      message: "User data successfully retrieved",
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified
      }
    })
  } catch(error: unknown) {
    console.error(`Error getting user's data: ${error instanceof Error ? error.message : error}`)
    res.status(500).json({
      success: false,
      message: "Internal server error while attempting to retrieve user's data",
      error: error instanceof Error ? error.message : error
    })
  }
}