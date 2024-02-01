import { Router } from 'express'
import { getFormations, createFormation, updateFormation, deleteFormation, getFormation, getFormationGroups } from '../controllers/formations.controller.js'

const router = Router()

router.get('/formations', getFormations)
router.post('/formations', createFormation)
router.put('/formations/:id', updateFormation)
router.delete('/formations/:id', deleteFormation)
router.get('/formations/:id', getFormation)

// Relation between formations and groups routes
router.get('/formations/:id/groups', getFormationGroups)

export default router
