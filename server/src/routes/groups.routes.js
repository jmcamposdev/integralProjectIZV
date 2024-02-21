import { Router } from 'express'
import { createGroup, deleteGroup, getGroup, getGroupLessons, getGroups, updateGroup } from '../controllers/groups.controllers.js'
import { authJwt } from '../middlewares/index.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on groups
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle groups routes
const router = Router()

router.get('/groups', getGroups) // Get all groups
router.post('/groups', [authJwt.verifyToken, authJwt.isAdmin], createGroup) // Create a new group
router.put('/groups/:id', [authJwt.verifyToken, authJwt.isAdmin], updateGroup) // Update a group
router.delete('/groups/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteGroup) // Delete a group
router.get('/groups/:id', getGroup) // Get a group by id
router.get('/groups/:id/lessons', getGroupLessons) // Get all lessons from a group

// Export router to use it in the app
export default router
