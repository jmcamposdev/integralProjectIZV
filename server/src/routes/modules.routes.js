import { Router } from 'express'
import { createModule, deleteModule, getModule, getModules, updateModule } from '../controllers/modules.controller.js'

const router = Router()

router.get('/modules', getModules)
router.post('/modules', createModule)
router.put('/modules/:id', updateModule)
router.delete('/modules/:id', deleteModule)
router.get('/modules/:id', getModule)

export default router
