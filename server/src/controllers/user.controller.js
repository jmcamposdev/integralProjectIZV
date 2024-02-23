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
  const { senecaUser, name, firstSurname, lastSurname, password, confirmPassword } = req.body

  if (!User.validateAllFields(senecaUser, name, firstSurname, lastSurname, password, confirmPassword)) {
    return res.status(400).json({ message: 'Necessary fields are empty' })
  }

  try {
    // Create a new user in the database
    const newUser = await User.create(req.body)
    // Delete the password from the user object
    delete newUser.dataValues.password
    // Send the new user in the response
    res.status(201).json({ message: 'User created successfully', user: newUser })
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
    const { senecaUser } = req.params
    // Validate the fields to be not null or empty
    if (!User.validateSomeFields(req.body)) {
      return res.status(400).json({ message: 'Necessary fields are empty' })
    }

    // Get the user
    const user = await User.findOne({ where: { senecaUser } })
    // If the user doesn't exist, send a 404 status code and a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // Update the user in the database
    if (req.body.password) {
      req.body.password = User.encryptPassword(req.body.password)
    }

    // Update the user in the database
    user.set(req.body)
    await user.save()
    // Delete the password from the user object
    delete user.dataValues.password
    // Send the updated user in the response
    res.json({ ...user.dataValues })
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
