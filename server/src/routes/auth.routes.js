import { Router } from 'express'
import { signIn, signUp } from '../controllers/auth.controller.js'

/**
 * ----------------------------------------------
 * Routes to Sign Up and Sign In users
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle auth routes
const router = Router()

router.post('/auth/signup', signUp) // Sign Up
router.post('/auth/signin', signIn) // Sign In

// Export router to use it in the app
export default router
