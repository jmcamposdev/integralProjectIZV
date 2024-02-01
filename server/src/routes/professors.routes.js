import { Router } from 'express'
import { createProfessor, deleteProfessor, getProfessor, getProfessors, updateProfessor } from '../controllers/professors.controller.js'

const router = Router()

router.get('/professors', getProfessors)
router.post('/professors', createProfessor)
router.put('/professors/:id', updateProfessor)
router.delete('/professors/:id', deleteProfessor)
router.get('/professors/:id', getProfessor)

export default router
