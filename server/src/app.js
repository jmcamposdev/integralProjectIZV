import express, { Router } from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Import routes
import formationsRoutes from './routes/formations.routes.js'
import groupsRoutes from './routes/groups.routes.js'
import professorsRoutes from './routes/professors.routes.js'
import modulesRoutes from './routes/modules.routes.js'
import lessonsRoutes from './routes/lessons.routes.js'
import authRoutes from './routes/auth.routes.js'

// InitialSetup
import * as initialSetup from './libs/initialSetup.js'
import { handleJsonSyntaxError } from './middlewares/index.js'

// Create Express app
const app = express()

// Init all Data
initialSetup.createRoles()

// Middlewares
app.use(express.json()) // Parse JSON bodies (as sent by API clients)
app.use(handleJsonSyntaxError) // Verify JSON
app.use(morgan('dev')) // Log requests to the console
dotenv.config() // Enable Environment Variables

// Routes

// API v1 routes
const apiV1Routes = Router()

// Mounting routes
apiV1Routes.use(formationsRoutes)
apiV1Routes.use(groupsRoutes)
apiV1Routes.use(professorsRoutes)
apiV1Routes.use(modulesRoutes)
apiV1Routes.use(lessonsRoutes)
apiV1Routes.use(authRoutes)

// Mount API v1 routes
app.use('/api/v1', apiV1Routes)

// Export Express app
export default app
