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

/**
 * Refresh the token for the user. This is used when the token is expired.
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const refreshToken = async (req, res) => {
  const { token } = req.body

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  if (!decoded) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  if (decoded.exp < Date.now() / 1000) {
    return res.status(401).json({ message: 'Token expired' })
  }

  const { id, role, senecaUser, name, firstSurname, lastSurname } = decoded

  const newToken = jwt.sign({ id, role, senecaUser, name, firstSurname, lastSurname }, process.env.JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  })

  res.json({ token: newToken })
}
