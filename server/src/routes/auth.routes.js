import { Router } from 'express'
import { signIn, signUp } from '../controllers/auth.controller.js'

const router = Router()

router.post('/auth/signup', signUp)
router.post('/auth/signin', signIn)

export default router
