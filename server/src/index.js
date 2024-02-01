import app from './app.js'
import { sequelize } from './database/database.js'

/**
 * Main function to start the server
 * @returns {Promise<void>}
 */
async function main () {
  try {
    await sequelize.sync({ force: false })
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
