import express from 'express'
import userRoutes from '../routes/userRoutes'
import path from 'path'
import noteRoutes from '../routes/noteRoutes'
import { errorHandler, notFound } from '../middlewares/errorMiddleware'

const app = express()
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

if (process.env.NODE_ENV === 'production' && process.env.VITE !== 'false') {
  const reactBuildPath = path.join('./react-static')
  const staticMiddleware = express.static(reactBuildPath)
  app.use(staticMiddleware)
  app.use('*', staticMiddleware)

  const assetsPath = path.join('./react-static/assets')
  app.use('/assets', express.static(assetsPath))
}

app.use(notFound)
app.use(errorHandler)

export default app
