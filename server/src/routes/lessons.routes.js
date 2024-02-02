import { Router } from 'express'
import { createLesson, deleteLesson, getLesson, getLessons, updateLesson } from '../controllers/lessons.controller.js'

const router = Router()

router.get('/lessons', getLessons)
router.post('/lessons', createLesson)
router.put('/lessons/:id', updateLesson)
router.delete('/lessons/:id', deleteLesson)
router.get('/lessons/:id', getLesson)

export default router
