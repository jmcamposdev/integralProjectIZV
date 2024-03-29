import { Router } from 'express'
import { createProfessor, deleteProfessor, getProfessor, getProfessorLessons, getProfessors, updateProfessor } from '../controllers/professors.controller.js'
import { authJwt } from '../middlewares/index.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on professors
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle professors routes
const router = Router()

router.get('/professors', getProfessors) // Get all professors
router.post('/professors', [authJwt.verifyToken, authJwt.isAdmin], createProfessor) // Create a new professor
router.put('/professors/:id', [authJwt.verifyToken, authJwt.isAdmin], updateProfessor) // Update a professor
router.delete('/professors/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteProfessor) // Delete a professor
router.get('/professors/:id', getProfessor) // Get a professor by id
router.get('/professors/:id/lessons', getProfessorLessons) // Get a professor's lessons

// Export router to use it in the app
export default router
