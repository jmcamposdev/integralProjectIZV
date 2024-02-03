import { Role } from '../models/Role.js'

/** -------------------------------------
 * This file contains all the middlewares to verify the Role of the user.
 * @function isValidRoleId: Verify if the role id exists in the database.
 */

/**
 * Verify if the role id exists in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isValidRoleId = async (req, res, next) => {
  try {
    // Get the role id from the request body
    const { roleId } = req.body

    // Validate the role id exists
    if (!roleId) {
      return res.status(400).json({ message: 'Role id is required' })
    }

    // Find the role in the database
    const role = await Role.findOne({ where: { id: roleId } })

    // If the role is not found, send a 404 status code and a message
    if (!role) {
      return res.status(404).json({ message: 'Role not found' })
    }

    next() // Call the next middleware
  } catch (error) { // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}
