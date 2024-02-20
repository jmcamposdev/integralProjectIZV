import { User } from '../models/User.js'

/** -----------------------------------------------------
 * This file contains all the middlewares to verify the SignIn process.
 * @function verifyNecessaryFields: Verify that the necessary fields are not empty. (email, password)
 * @function authenticateUser: Verify email and password for authentication.
 * -----------------------------------------------------
 */

/**
 * Verify that the necessary fields are not empty.
 * - Necessary fields: email, password
 * - If the fields are empty, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const verifyNecessaryFields = (req, res, next) => {
  // Get the email and password from the request body
  const { senecaUser, password } = req.body

  // If the fields are undefined, null or empty, send a 400 status code and a message
  if (!senecaUser?.trim() || !password?.trim()) {
    res.status(400).json({ message: 'The fields senecaUser & password are required' })
    return
  }

  next() // Call the next middleware
}

/**
 * Verify senecaUser and password for authentication.
 * - If the credentials are invalid, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const authenticateUser = async (req, res, next) => {
  // Get the email and password from the request body
  const { senecaUser, password } = req.body

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { senecaUser } })

    // If the user does not exist, or the password is incorrect, send a 400 status code and a message
    if (!user || !User.comparePassword(password, user.password)) {
      res.status(400).json({ message: 'Incorrect senecaUser/password' })
      return
    }

    // Attach the user id to the request object to use in the method signIn to generate the token
    req.userId = user.id
    req.roleId = user.roleId
    req.name = user.name
    req.firstSurname = user.firstSurname
    req.lastSurname = user.lastSurname
    req.senecaUser = user.senecaUser

    next() // Call the next middleware
  } catch (error) {
    console.error('Error during authentication:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
