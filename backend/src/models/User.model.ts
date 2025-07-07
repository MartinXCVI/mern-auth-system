// Types/Interfaces imports
import { IUserSchema } from "./interfaces/IUserSchema.js";
// Mongoose imports
import mongoose, { Schema, Model } from "mongoose";

const UserSchema = new Schema<IUserSchema>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  verifyOtp: {
    type: String,
    default: ''
  },
  verifyOtpExpireAt: {
    type: Number,
    default: 0
  },
  isAccountVerified: {
    type: Boolean,
    default: false
  },
  resetOtp: {
    type: String,
    default: ''
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0
  },
})

const UserModel: Model<IUserSchema> = mongoose.model('User', UserSchema)

export default UserModel