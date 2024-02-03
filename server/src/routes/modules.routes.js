import { Router } from 'express'
import { createModule, deleteModule, getModule, getModules, updateModule } from '../controllers/modules.controller.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on modules
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle modules routes
const router = Router()

router.get('/modules', getModules) // Get all modules
router.post('/modules', createModule) // Create a new module
router.put('/modules/:id', updateModule) // Update a module
router.delete('/modules/:id', deleteModule) // Delete a module
router.get('/modules/:id', getModule) // Get a module by id

// Export router to use it in the app
export default router
