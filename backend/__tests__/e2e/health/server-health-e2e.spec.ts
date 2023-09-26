import app from '../../../src/app'
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

  describe('api should return expected message', () => {
    test('status code', async () => {
      const response = await request(app).get('/api/health')
      const expected = 200
      const recived = response.statusCode
      expect(recived).toBe(expected)
    })

    test('response text', async () => {
      const response = await request(app).get('/api/health')
      const expected = 'Api is Running'
      const recived = response.text
      expect(recived).toBe(expected)
    })
  })
})
