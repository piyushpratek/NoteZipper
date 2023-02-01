import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import { generateToken } from '../utils/generateToken'
import type { Request, Response } from 'express'
import type { CustomRequest } from '../types'

interface UserType {
  name: string
  email: string
  password: string
  pic: string
}

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, pic } = req.body as UserType

  const userExists = await User.findOne({ email })

  if (userExists != null) {
    res.status(400)
    throw new Error('User Already Exists')
  }
  try {
    const user = await User.create({
      name,
      email,
      password,
      pic,
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    res.status(400)
    throw new Error('Error Ocurred! ')
  }
})
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body as UserType

  const user = await User.findOne({ email })

  if (user != null && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.IsAdmin,
      pic: user.pic,
      token: generateToken(user._id.toString()),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Email or Password! ')
  }
})
export const updateUserProfile = asyncHandler(
  async (req: CustomRequest<UserType>, res: Response) => {
    console.log('request user?', req?.user?._id)

    //  way one
    // const user = await User.findById(req?.user?._id)

    //  way two
    const user = await User.findOne({ _id: req?.user?._id })

    console.log('user?', user)
    if (user != null) {
      // We update the properties of `user` only if they are defined.
      if (typeof req.body.name !== 'undefined') {
        user.name = req.body.name
      }
      if (typeof req.body.email !== 'undefined') {
        user.email = req.body.email
      }
      if (typeof req.body.pic !== 'undefined') {
        user.pic = req.body.pic
      }
      if (typeof req.body.password !== 'undefined') {
        user.password = req.body.password
      }

      // Finally we save the updated user to database
      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id.toString()),
      })
    } else {
      res.status(404)
      throw new Error('User not Found')
    }
  }
)

export default registerUser
