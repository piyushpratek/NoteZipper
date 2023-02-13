import app from './app'
import connectDB from './config/mongoDB'
import logger from './config/logger'
// import exportError from './middlewares/errorMiddleware';
// import { notFound } from './middlewares/errorMiddleware';
// import errorHandler from './middlewares/errorMiddleware';

void connectDB.connect() 

const PORT = Number(process.env.PORT) ?? 5000 //  nullish operator ?? is better than or operator ||
app.listen(PORT, () => {
  logger.success(`server started on port ${PORT} `)
})
