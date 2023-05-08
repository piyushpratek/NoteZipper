import express from 'express'
import userRoutes from '../routes/userRoutes'
import path from 'path'
import noteRoutes from '../routes/noteRoutes'
import { errorHandler, notFound } from '../middlewares/errorMiddleware'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/*', errorHandler)
app.use('/api/*', notFound)

if (process.env.USE_STATIC_BUILD === 'true') {
  const reactBuildPath = path.join('./react-static')
  const staticMiddleware = express.static(reactBuildPath)
  app.use(staticMiddleware)
  app.use('*', staticMiddleware)

  const assetsPath = path.join('./react-static/assets')
  app.use('/assets', express.static(assetsPath))
} else {
  // Redirect to /api/health
  app.use('*', (req, res) => {
    res.redirect('/api/health')
  })
}

export default app
