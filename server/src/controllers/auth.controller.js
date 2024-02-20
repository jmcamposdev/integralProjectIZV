import { Role } from '../models/Role.js'
import jwt from 'jsonwebtoken'

/**
 * Generate the token for the user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const signIn = async (req, res) => {
  try {
    // Find the user in the database
    const { userId, roleId, senecaUser, name, firstSurname, lastSurname } = req

    const role = await Role.findOne({ where: { id: roleId } })

    // Generate the token
    const token = jwt.sign({ id: userId, role: role.name, senecaUser, name, firstSurname, lastSurname }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    })

    // Send the token in the response
    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message, token: null })
  }
}
