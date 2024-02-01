import { Router } from 'express'
import { getFormations, createFormation, updateFormation, deleteFormation, getFormation } from '../controllers/formations.controller.js'

const router = Router()

router.get('/formations', getFormations)
router.post('/formations', createFormation)
router.put('/formations/:id', updateFormation)
router.delete('/formations/:id', deleteFormation)
router.get('/formations/:id', getFormation)

export default router
