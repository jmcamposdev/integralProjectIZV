import { User } from '../models/User.js'

/**
 * Get all users from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getUsers = async (req, res) => {
  try {
    // Get all users from database
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    // Send the users in the response as JSON
    res.json(users)
  } catch (error) { // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}

/**
 * Get one user from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getUser = async (req, res) => {
  try {
    // Destructuring the id from the request parameters
    const { id } = req.params
    // Find the user in the database
    const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } })
    // If the user doesn't exist, send a 404 status code and a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Send the user in the response as JSON
    res.json(user)
  } catch (error) { // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    // Destructuring the request body to get the values of the fields
    const { username, email, password, roleId } = req.body
    // Create the user
    const user = await User.create({ username, email, password: User.encryptPassword(password), roleId })
    // Remove the password from the user object
    delete user.dataValues.password
    // Send the created user in the response
    res.json({ message: 'User created successfully', user })
  } catch (error) { // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}

/**
 * Update a user in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateUser = async (req, res) => {
  try {
    // Destructuring the id from the request parameters
    const { id } = req.params
    // Get the user
    const user = await User.findOne({ where: { id } })
    // If the user doesn't exist, send a 404 status code and a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Update the user in the database
    if (req.body.password) {
      req.body.password = User.encryptPassword(req.body.password)
    }
    user.set(req.body)
    await user.save()
    // Delete the password from the user object
    delete user.dataValues.password
    // Send the updated user in the response
    res.json({ message: 'User updated successfully', user })
  } catch (error) { // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}

/**
 * Delete a user from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteUser = async (req, res) => {
  try {
    // Destructuring the id from the request parameters
    const { id } = req.params
    // Delete the user from the database
    await User.destroy({ where: { id } })
    // Send a message in the response
    res.json({ message: 'User deleted successfully' })
  } catch (error) { // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}