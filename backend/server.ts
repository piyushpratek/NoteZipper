import express from 'express';
import notes from './data/notes';
import dotenv from 'dotenv';
const connectDb=require("./config/db")
const app = express();
dotenv.config();
 connectDb()

app.get('/', (req, res) => {
  res.send('API IS RUNNING');
});
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`server started on port ${PORT} `));
