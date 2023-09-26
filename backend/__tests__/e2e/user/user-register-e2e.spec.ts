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
    const { name, email, password, pic, IsAdmin } = userFactory.build()

    const response = await request(app).post('/api/users').send({ name, email, password, pic })
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      // _id: expect.any(String),
      _id: expect.stringMatching(SIMPLE_MONGODB_ID_REGEX),
      email,
      // TODO: Change `IsAdmin` field name to `isAdmin` in `userSchema`. Register API returns correct field name though i.e, `isAdmin`
      isAdmin: IsAdmin,
      name,
      pic,
      token: expect.any(String),
    })
  })
})
