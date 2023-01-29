import dotenv from 'dotenv'

dotenv.config()

if (typeof process.env.MONGO_URI === 'undefined') {
  throw new Error('Please define MONGO_URI in your .env file.')
}
if (typeof process.env.JWT_SECRET === 'undefined') {
  throw new Error(' Please define JWT_SECRET in your .env file.')
}
if (typeof process.env.NODE_ENV === 'undefined') {
  throw new Error('Please Define Your NODE_ENV in your .env file.')
}

export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const NODE_ENV = process.env.NODE_ENV
