import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../src/app'
import mongoDB from '../../../config/mongoDB'
import { SIMPLE_MONGODB_ID_REGEX } from '../../../constants'
import { clearDatabase } from '../../../utils/mongo-helpers'
import { userFactory } from '../../factories/user.factory'

describe('users', () => {
  beforeAll(async () => {
    await mongoDB.connect()
    await clearDatabase(mongoose.connection)
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test('successful registration', async () => {
    const user = userFactory.build()

    const response = await request(app).post('/api/users').send(user)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      // _id: expect.any(String),
      _id: expect.stringMatching(SIMPLE_MONGODB_ID_REGEX),
      email: user.email,
      isAdmin: user.IsAdmin,
      name: user.name,
      pic: user.pic,
      token: expect.any(String),
    })
  })
})
