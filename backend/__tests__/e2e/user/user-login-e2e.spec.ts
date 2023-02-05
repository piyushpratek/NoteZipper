import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../app'
import mongoDB from '../../../config/mongoDB'
import { SIMPLE_MONGODB_ID_REGEX } from '../../../constants'
import { UserType } from '../../../models/userModel'
import { clearDatabase } from '../../../utils/mongo-helpers'
import { userFactory } from '../../factories/user.factory'

describe('users', () => {
  let sampleUser: Partial<UserType>
  let samplePassword: string
  beforeAll(async () => {
    await mongoDB.connect()
    await clearDatabase(mongoose.connection)
    samplePassword = 'mysecret'
    sampleUser = userFactory.build()
    console.log('sampleUser.password?', sampleUser.password)

    // Register a user
    await request(app).post('/api/users').send({...sampleUser, password: samplePassword})
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test.only('successful Login', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: sampleUser.email, password: samplePassword })

    expect(response.statusCode).toBe(200)
    // expect(response.body).toEqual(1)
  })
})
