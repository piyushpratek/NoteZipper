import express from 'express'
import userRoutes from './routes/userRoutes'
import noteRoutes from './routes/noteRoutes'
import { errorHandler, notFound } from './middlewares/errorMiddleware'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json('API IS RUNNING..')
})

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
