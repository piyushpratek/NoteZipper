import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../app'
import mongoDB from '../../../config/mongoDB'
import { SIMPLE_MONGODB_ID_REGEX } from '../../../constants'
import { clearDatabase } from '../../../utils/mongo-helpers'
import { userFactory } from '../../factories/user.factory'

describe('users', () => {
  let sampleUser
  beforeAll(async () => {
    await mongoDB.connect()
    await clearDatabase(mongoose.connection)
    sampleUser = userFactory.build()
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test('successful registration', async () => {
    const response = await request(app).post('/api/users').send(sampleUser)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      _id: expect.stringMatching(SIMPLE_MONGODB_ID_REGEX),
      email: 'user1@sample.com',
      isAdmin: false,
      name: 'Name 1',
      pic: 'https://sample.com/factory.png',
      token: expect.any(String),
    })
  })
})
