import { Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller.js'
import { authJwt, verifyRole, verifySignUp } from '../middlewares/index.js'

/** ----------------------------------------------
 * Routes to do CRUD operations on users
 * @type {Router}
 */

// Create a new router to handle users routes
const router = Router()

router.get('/users', [authJwt.verifyToken, authJwt.isAdmin], getUsers) // Get all users
router.post(
  '/users',
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.verifyNecessaryFields,
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifyRole.isValidRoleId
  ],
  createUser) // Create a new user
router.put('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], updateUser) // Update a user
router.delete('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteUser) // Delete a user
router.get('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], getUser) // Get a user by id

export default router
