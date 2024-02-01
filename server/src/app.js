import express from 'express'
import formationsRoutes from './routes/formations.routes.js'
import groupsRoutes from './routes/groups.routes.js'
import professorsRoutes from './routes/professors.routes.js'
import modulesRoutes from './routes/modules.routes.js'
// Create Express app
const app = express()

// Middlewares
app.use(express.json()) // Parse JSON bodies (as sent by API clients)

// Routes
app.use(formationsRoutes)
app.use(groupsRoutes)
app.use(professorsRoutes)
app.use(modulesRoutes)

// Export Express app
export default app
