import { Router } from 'express'
import { createModule, deleteModule, getModule, getModuleLessons, getModules, updateModule } from '../controllers/modules.controller.js'
import { authJwt } from '../middlewares/index.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on modules
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle modules routes
const router = Router()

router.get('/modules', getModules) // Get all modules
router.post('/modules', [authJwt.verifyToken, authJwt.isAdmin], createModule) // Create a new module
router.put('/modules/:id', [authJwt.verifyToken, authJwt.isAdmin], updateModule) // Update a module
router.delete('/modules/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteModule) // Delete a module
router.get('/modules/:id', getModule) // Get a module by id
router.get('/modules/:id/lessons', getModuleLessons) // Get all lessons of a module

// Export router to use it in the app
export default router
