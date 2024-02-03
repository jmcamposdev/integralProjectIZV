import { ROLES } from '../models/Role.js'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

/**
 * Create a new user in the database.
 * - Encrypt the password
 * - Save the new user in the database
 * - Generate the token
 * @param {*} req The request object
 * @param {*} res The response object
 * @returns The token in the response
 */
export const signUp = async (req, res) => {
  // Get the username, email and password from the request body
  const { username, email, password } = req.body

  try {
    // Create the new user Object
    const newUser = new User({
      username,
      email,
      password: User.encryptPassword(password), // Encrypt the password
      roleId: ROLES.USER // Set the default role
    })

    // Save the new user in the database
    const user = await newUser.save()

    // Generate the token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    })

    // Send the token in the response
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message, token: null })
  }
}

/**
 * Generate the token for the user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const signIn = async (req, res) => {
  try {
    // Find the user in the database
    const userId = req.userId

    // Generate the token
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    })

    // Send the token in the response
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message, token: null })
  }
}
