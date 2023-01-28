import type { Request } from 'express'
import type { Types } from 'mongoose'

export interface RequestAuth extends Request<Types.ObjectId> {
  user?: UserType
}

export interface UserType {
  _id?: string
}
