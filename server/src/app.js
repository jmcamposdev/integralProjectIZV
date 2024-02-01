import express from 'express'
import formationsRoutes from './routes/formations.routes.js'
// Create Express app
const app = express()

// Middlewares
app.use(express.json()) // Parse JSON bodies (as sent by API clients)

app.use(formationsRoutes)
// Export Express app
export default app
