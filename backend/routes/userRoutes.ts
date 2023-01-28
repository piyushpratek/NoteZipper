import express from 'express'
import registerUser, { authUser } from '../controllers/userControllers'

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)

// module.exports = router;
export default router
