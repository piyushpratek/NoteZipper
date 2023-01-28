import type { Request } from 'express'

export interface RequestAuth extends Request {
  user?: UserType
}

export interface UserType {
  _id?: string
}
