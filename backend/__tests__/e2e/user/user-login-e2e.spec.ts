import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../../src/app'
import mongoDB from '../../../config/mongoDB'
import { SIMPLE_MONGODB_ID_REGEX } from '../../../constants'
import User, { UserDoc } from '../../../models/userModel'
import { clearDatabase } from '../../../utils/mongo-helpers'
import { userFactory } from '../../factories/user.factory'

describe('users', () => {
  let activeUser: UserDoc
  let activeUserPlainPassword: string
  beforeAll(async () => {
    await mongoDB.connect()
    await clearDatabase(mongoose.connection)

    activeUserPlainPassword = 'mysecret'
    const user = userFactory.build({ password: activeUserPlainPassword })

    // Note: User schema calls `hashPassword()` to hash password internaly to
    // save hash of the password instead of plain password
    activeUser = await User.create(user)
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test('successful Login', async () => {
    // Login user
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: activeUser.email, password: activeUserPlainPassword })

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
