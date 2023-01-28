import express from 'express'
import {
  createNote,
  DeleteNote,
  getNoteById,
  getNotes,
  UpdateNote,
} from '../controllers/noteController'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/').get(protect, getNotes)
router.route('/create').post(protect, createNote)
router
  .route('/:id')
  .get(getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote)

export default router
