import { User } from '../models/User.js'

/** -----------------------------------------------------
 * This file contains all the middlewares to verify the SignUp process.
 * @function verifyNecessaryFields: Verify that the necessary fields are not empty.
 * @function checkDuplicateUsernameOrEmail: Verify that the username or email are not already in use.
 * -----------------------------------------------------
 */

/**
 * Verify that the necessary fields are not empty.
 * - Necessary fields: senecaUser, name, firstSurname, lastSurname, password
 * - If the fields are empty, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const verifyNecessaryFields = (req, res, next) => {
  // Get the username, email and password from the request body
  const { senecaUser, name, firstSurname, lastSurname, password, confirmPassword } = req.body

  if (!User.validateAllFields(senecaUser, name, firstSurname, lastSurname, password, confirmPassword)) {
    res.status(400).json({ message: 'Necessary fields are empty' })
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
export const checkDuplicateSenecaUser = async (req, res, next) => {
  // Get the username from the request body
  const { senecaUser } = req.body

  // Check if the username already exists
  const user = await User.exists(senecaUser)

  if (user) {
    res.status(400).json({ message: 'The username already exists' })
    return
  }

  next() // Call the next middleware
}
