import express from 'express'
import registerUser, {
  authUser,
  updateUserProfile,
} from '../controllers/userControllers'
import { protect } from '../middlewares/authMiddleware'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protect, updateUserProfile)

// module.exports = router;
export default router
