import mongoose from 'mongoose'
import { MONGO_URI } from './config'

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true)
    const conn = await mongoose.connect(MONGO_URI)
    console.log(`Mongo Db Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${(error as Error).message}`)
    process.exit()
  }
}

export default connectDB
