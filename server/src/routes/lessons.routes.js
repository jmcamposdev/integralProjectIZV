import { Router } from 'express'
import { createLesson, deleteLesson, getLesson, getLessons, updateLesson } from '../controllers/lessons.controller.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on lessons
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle lessons routes
const router = Router()

router.get('/lessons', getLessons) // Get all lessons
router.post('/lessons', createLesson) // Create a new lesson
router.put('/lessons/:id', updateLesson) // Update a lesson
router.delete('/lessons/:id', deleteLesson) // Delete a lesson
router.get('/lessons/:id', getLesson) // Get a lesson by id

// Export router to use it in the app
export default router
