import express from 'express'
import notes from './data/notes'
import dotenv from 'dotenv'
import connectDB from './config/db'
import userRoutes from './routes/userRoutes'
import noteRoutes from './routes/noteRoutes'
import { errorHandler, notFound } from './middlewares/errorMiddleware'
// import exportError from './middlewares/errorMiddleware';
// import { notFound } from './middlewares/errorMiddleware';
// import errorHandler from './middlewares/errorMiddleware';

const app = express()
dotenv.config()
connectDB()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API IS RUNNING..')
})

// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

// app.get('/api/notes/:id', (req, res) => {
//   const note = notes.find((n) => n._id === req.params.id);
//   res.send(note);
// });

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

app.use(notFound)
app.use(errorHandler)

// app.use(exportError);
// app.use(notFound);
// app.use(errorHandler);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started on port ${PORT} `))
