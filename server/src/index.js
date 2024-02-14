import app from './app.js'
import { sequelize } from './database/database.js'
import { initialSetup } from './libs/initialSetup.js'

/**
 * Main function to start the server
 * @returns {Promise<void>}
 */
async function main () {
  try {
    await sequelize.sync({ alter: true }) // If force is true, all tables are dropped and recreated
    // Create the roles
    await initialSetup()
    // Start the server listening on port 3001
    app.listen(3001, () => {
      // Know that the server is running
      console.log('Server listening on port', 3001)
    })
  } catch (e) {
    console.error(e)
  }
}

// Execute the server
main()
