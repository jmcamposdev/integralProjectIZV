import { Router } from 'express'
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../controllers/groups.controllers.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on groups
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle groups routes
const router = Router()

router.get('/groups', getGroups) // Get all groups
router.post('/groups', createGroup) // Create a new group
router.put('/groups/:id', updateGroup) // Update a group
router.delete('/groups/:id', deleteGroup) // Delete a group
router.get('/groups/:id', getGroup) // Get a group by id

// Export router to use it in the app
export default router
