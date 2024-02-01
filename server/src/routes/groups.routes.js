import { Router } from 'express'
import { createGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../controllers/groups.controllers.js'

const router = Router()

router.get('/groups', getGroups)
router.post('/groups', createGroup)
router.put('/groups/:id', updateGroup)
router.delete('/groups/:id', deleteGroup)
router.get('/groups/:id', getGroup)

export default router
