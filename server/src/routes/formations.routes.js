import { Router } from 'express'
import { getFormations, createFormation, updateFormation, deleteFormation, getFormation, getFormationGroups, getFormationsModules } from '../controllers/formations.controller.js'
import { authJwt } from '../middlewares/index.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on formations
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle formations routes
const router = Router()

router.get('/formations', getFormations) // Get all formations
router.post('/formations', [authJwt.verifyToken, authJwt.isAdmin], createFormation) // Create a new formation
router.put('/formations/:id', [authJwt.verifyToken, authJwt.isAdmin], updateFormation) // Update a formation
router.delete('/formations/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteFormation) // Delete a formation
router.get('/formations/:id', getFormation) // Get a formation by id

// Relation between formations and groups routes
router.get('/formations/:id/groups', getFormationGroups) // Get all groups of a formation
router.get('/formations/:id/modules', getFormationsModules) // Get all modules of a formation

// Export router to use it in the app
export default router
