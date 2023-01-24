import Note from '../models/noteModel';
import asyncHandler from 'express-async-handler';

export const getNotes = asyncHandler(async (req: any, res: any) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

export const createNote = asyncHandler(async (req: any, res: any) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please Fill all the Fields');
  } else {
    //user is coming from authMiddleware
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});
//we are fetching .id from the url that we put in noteRoutes
export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not Found' });
  }
});

export const UpdateNote = asyncHandler(async (req: any, res: any) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note?.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error('Note not Found');
  }
});

export const DeleteNote = asyncHandler(async (req: any, res: any) => {
  const note = await Note.findById(req.params.id);

  if (note?.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: 'Note Removed' });
  } else {
    res.status(404);
    throw new Error('Note not Found');
  }
});
