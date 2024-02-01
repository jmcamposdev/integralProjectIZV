import { Router } from 'express'
import { getFormations, createFormation } from '../controllers/formations.controller.js'

const router = Router()

router.get('/formations', getFormations)
router.post('/formations', createFormation)
router.put('/formations/:id')
router.delete('/formations/:id')
router.get('/formations/:id')

export default router
