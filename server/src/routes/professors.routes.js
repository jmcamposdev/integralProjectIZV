import { Router } from 'express'
import { createProfessor, deleteProfessor, getProfessor, getProfessors, updateProfessor } from '../controllers/professors.controller.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on professors
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle professors routes
const router = Router()

router.get('/professors', getProfessors) // Get all professors
router.post('/professors', createProfessor) // Create a new professor
router.put('/professors/:id', updateProfessor) // Update a professor
router.delete('/professors/:id', deleteProfessor) // Delete a professor
router.get('/professors/:id', getProfessor) // Get a professor by id

// Export router to use it in the app
export default router
