import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../src/app'
import mongoDB from '../../../config/mongoDB'
import { SIMPLE_MONGODB_ID_REGEX } from '../../../constants'
import { UserType } from '../../../models/userModel'
import { clearDatabase } from '../../../utils/mongo-helpers'
import { userFactory } from '../../factories/user.factory'

describe('users', () => {
  let activeUser: Partial<UserType>
  let plainPassword: string
  beforeAll(async () => {
    await mongoDB.connect()
    await clearDatabase(mongoose.connection)
    plainPassword = 'mysecret'
    activeUser = userFactory.build()

    // Register a user
    await request(app)
      .post('/api/users')
      .send({ ...activeUser, password: plainPassword })
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test('successful Login', async () => {
    // Login user
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: activeUser.email, password: plainPassword })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      _id: expect.stringMatching(SIMPLE_MONGODB_ID_REGEX),
      email: activeUser.email,
      isAdmin: activeUser.IsAdmin,
      name: activeUser.name,
      pic: activeUser.pic,
      token: expect.any(String),
    })
  })
})
