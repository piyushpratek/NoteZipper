import Note from '../models/noteModel'
import asyncHandler from 'express-async-handler'
import type { Response } from 'express'
import type { RequestAuth } from '../types'

interface GetNotesType {
  title: string
  content: string
  category: string
}

export const getNotes = asyncHandler(
  async (req: RequestAuth, res: Response) => {
    const notes = await Note.find({ user: req?.user?._id })
    res.json(notes)
  }
)

export const createNote = asyncHandler(async (req: RequestAuth, res) => {
  const { title, content, category } = req.body as GetNotesType

  if (title === '' || content === '' || category === '') {
    res.status(400)
    throw new Error('Please Fill all the Fields')
  } else {
    // user is coming from authMiddleware
    const note = new Note({ user: req?.user?._id, title, content, category })

    const createdNote = await note.save()

    res.status(201).json(createdNote)
  }
})
// we are fetching .id from the url that we put in noteRoutes
export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)

  if (note != null) {
    res.json(note)
  } else {
    res.status(404).json({ message: 'Note not Found' })
  }
})

export const UpdateNote = asyncHandler(async (req: RequestAuth, res) => {
  const { title, content, category } = req.body as GetNotesType
  const note = await Note.findById(req?.params.id)

  if (note?.user.toString() !== req?.user?._id?.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }
  if (note != null) {
    note.title = title
    note.content = content
    note.category = category
    const updatedNote = await note.save()
    res.json(updatedNote)
  } else {
    res.status(404)
    throw new Error('Note not Found')
  }
})

export const DeleteNote = asyncHandler(async (req: RequestAuth, res) => {
  const note = await Note.findById(req.params.id)

  if (note?.user.toString() !== req?.user?._id?.toString()) {
    res.status(401)
    throw new Error("You can't perform this action")
  }

  if (note != null) {
    await note.remove()
    res.json({ message: 'Note Removed' })
  } else {
    res.status(404)
    throw new Error('Note not Found')
  }
})
