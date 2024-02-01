import app from './app.js'

/**
 * Main function to start the server
 * @returns {Promise<void>}
 */
async function main () {
  // Start the server listening on port 3001
  app.listen(3001, () => {
    // Know that the server is running
    console.log('Server listening on port', 3001)
  })
}

// Execute the server
main()
