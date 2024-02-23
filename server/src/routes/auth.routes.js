import { Router } from 'express'
import { refreshToken, signIn } from '../controllers/auth.controller.js'

import { authJwt, verifySignIn } from '../middlewares/index.js'

/**
 * ----------------------------------------------
 * Routes to Sign Up and Sign In users
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle auth routes
const router = Router()

// Sign In
router.post(
  '/auth/signin',
  [verifySignIn.verifyNecessaryFields, verifySignIn.authenticateUser],
  signIn) // Sign In
router.post('/auth/refresh-token', [authJwt.verifyToken, authJwt.isAdmin], refreshToken) // Refresh Token

// Export router to use it in the app
export default router
