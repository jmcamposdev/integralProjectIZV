import { Router } from 'express'
import { getFormations, createFormation, updateFormation, deleteFormation, getFormation, getFormationGroups, getFormationsModules } from '../controllers/formations.controller.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on formations
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle formations routes
const router = Router()

router.get('/formations', getFormations) // Get all formations
router.post('/formations', createFormation) // Create a new formation
router.put('/formations/:id', updateFormation) // Update a formation
router.delete('/formations/:id', deleteFormation) // Delete a formation
router.get('/formations/:id', getFormation) // Get a formation by id

// Relation between formations and groups routes
router.get('/formations/:id/groups', getFormationGroups) // Get all groups of a formation
router.get('/formations/:id/modules', getFormationsModules) // Get all modules of a formation

// Export router to use it in the app
export default router
