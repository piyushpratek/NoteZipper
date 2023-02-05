import app from '../../../app'
import request from 'supertest'
import mongoDB from '../../../config/mongoDB'
import mongoose from 'mongoose'
import { clearDatabase } from '../../../utils/mongo-helpers'

describe('Server health checkup', () => {
  beforeAll(async () => {
    await mongoDB.connect()
    await clearDatabase(mongoose.connection)
  })

  afterAll(async () => {
    await mongoDB.disconnect()
  })

  test('api should return expected message', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('API IS RUNNING..')
  })
})
