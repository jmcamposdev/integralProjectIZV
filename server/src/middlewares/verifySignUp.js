import { User } from '../models/User.js'

/** -----------------------------------------------------
 * This file contains all the middlewares to verify the SignUp process.
 * @function verifyNecessaryFields: Verify that the necessary fields are not empty.
 * @function checkDuplicateUsernameOrEmail: Verify that the username or email are not already in use.
 * -----------------------------------------------------
 */

/**
 * Verify that the necessary fields are not empty.
 * - Necessary fields: username, email, password
 * - If the fields are empty, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const verifyNecessaryFields = (req, res, next) => {
  // Get the username, email and password from the request body
  const { name, email, password } = req.body

  // If the fields are undefined, null or empty, send a 400 status code and a message
  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    res.status(400).json({ message: 'The fields username, email or password are required' })
    return
  }

  next() // Call the next middleware
}

/**
 * Verify that the username or email are not already in use.
 * - If the username or email are already in use, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Get the username and email from the request body
  const { name, email } = req.body

  // Find the user in the database
  const foundEmail = await User.findOne({ where: { email } })

  // If the email is already in use, send a 400 status code and a message
  if (foundEmail) {
    res.status(400).json({ message: 'Email already in use' })
    return
  }

  // Find the user in the database
  const foundUsername = await User.findOne({ where: { name } })

  // If the username is already in use, send a 400 status code and a message
  if (foundUsername) {
    res.status(400).json({ message: 'Name already in use' })
    return
  }

  next() // Call the next middleware
}
