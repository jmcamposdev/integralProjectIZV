import { ROLES, Role } from '../models/Role.js'
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
  const { name, email, password } = req.body

  try {
    // Create the new user Object
    const newUser = new User({
      name,
      email,
      password: User.encryptPassword(password), // Encrypt the password
      roleId: ROLES.USER // Set the default role
    })

    // Save the new user in the database
    const user = await newUser.save()
    const role = await Role.findOne({ where: { id: user.roleId } })

    // Generate the token
    const token = jwt.sign({ id: user.id, role: role.name, name, email }, process.env.JWT_SECRET, {
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
    const roleId = req.roleId
    const role = await Role.findOne({ where: { id: roleId } })
    const email = req.email
    const name = req.name

    // Generate the token
    const token = jwt.sign({ id: userId, role: role.name, name, email }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    })

    // Send the token in the response
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message, token: null })
  }
}
