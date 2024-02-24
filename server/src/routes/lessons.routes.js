import { Router } from 'express'
import { createLesson, deleteLesson, getCurrentYearLessons, getLesson, getLessons, updateLesson } from '../controllers/lessons.controller.js'
import { authJwt } from '../middlewares/index.js'

/**
 * ----------------------------------------------
 * Routes to do CRUD operations on lessons
 * @type {Router}
 * ----------------------------------------------
 */

// Create a new router to handle lessons routes
const router = Router()

router.get('/lessons', getLessons) // Get all lessons
router.post('/lessons', [authJwt.verifyToken, authJwt.isAdmin], createLesson) // Create a new lesson
router.put('/lessons/:id', [authJwt.verifyToken, authJwt.isAdmin], updateLesson) // Update a lesson
router.delete('/lessons/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteLesson) // Delete a lesson
router.get('/lessons/:id', getLesson) // Get a lesson by id
router.get('/lessons-current-year', getCurrentYearLessons) // Get all lessons, professors, modules from the current year
// Export router to use it in the app
export default router
