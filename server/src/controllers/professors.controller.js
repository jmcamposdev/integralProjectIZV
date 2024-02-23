import { Professor, professorExists, professorFieldsValidation, professorHasLessons, professorValidateSomeFields } from '../models/Professor.js'
import { Lesson } from '../models/Lesson.js'
import { User } from '../models/User.js'
import { ROLES } from '../models/Role.js'

/**
 * Get all professors from database
 * - If there are professors, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getProfessors = async (req, res) => {
  try {
    // Get all professors from database
    const professors = await Professor.findAll()
    // Send the professors in the response as JSON
    res.json(professors)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}

/**
 * Get one professor from database by id
 * - If the professor exists, send it in the response
 * - If the professor doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getProfessor = async (req, res) => {
  try {
    // Destructuring the id from the request parameters
    const { id } = req.params

    // Get the professor from database
    const professor = await Professor.findOne({ where: { id } })

    // If the professor doesn't exist, send a 404 status code and a message
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' })
    }

    // Send the professor in the response as JSON
    res.json(professor)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}

/**
 * Create a new professor in database from the request body
 * - If the request body has { senecaUser, name, firstSurname, lastSurname, specialty }, create the professor and send it in the response
 * - If the request body is empty or doesn't have the required fields, send a 400 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createProfessor = async (req, res) => {
  // Destructuring the request body to get the values of the fields
  const {
    senecaUser,
    name,
    firstSurname,
    lastSurname,
    specialty,
    password,
    confirmPassword
  } = req.body

  // Validate that all fields are not empty
  if (!professorFieldsValidation(senecaUser, name, firstSurname, lastSurname, specialty, password, confirmPassword)) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Validate that there doesn't exist a professor with the same senecaUser
  if (await professorExists(senecaUser)) {
    return res.status(400).json({ message: 'Already exists a professor with that senecaUser' })
  }

  try {
    // Create the professor
    const createdProfessor = await Professor.create({
      senecaUser,
      name,
      firstSurname,
      lastSurname,
      specialty
    })

    // Create the user
    const user = await User.create({
      senecaUser,
      name,
      firstSurname,
      lastSurname,
      password: User.encryptPassword(password), // Encrypt the password
      roleId: ROLES.USER // Set the default role a user
    })

    // If there's an error creating the professor or the user, send a 500 status code and a message
    if (!createdProfessor || !user) {
      return res.status(500).json({ message: 'Error creating the professor' })
    }

    // Send the created professor in the response
    res.json(createdProfessor)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}

/**
 * Update a professor in database by id
 * - If the professor exists, update it and send it in the response
 * - If the professor doesn't exist, send a 404 status code and a message
 * - If the request body is empty or doesn't have the required fields, send a 400 status code and a message
 * @param {Object} req The request object from Express
 * @param {Object} res The response object from Express
 * @returns
 */
export const updateProfessor = async (req, res) => {
  // Destructuring the id from the request parameters
  const { id } = req.params

  try {
    // Validate all the fields
    if (!professorValidateSomeFields(req.body)) {
      return res.status(400).json({ message: 'All fields are required and not empty' })
    }

    // If is defined the senecaUser, validate that there's no other professor with the same senecaUser
    if (req.body.senecaUser && await professorExists(req.body.senecaUser)) {
      return res.status(400).json({ message: 'Already exists a professor with that senecaUser' })
    }

    // If is defined the specialty, validate that the Professor has no assigned lessons
    if (req.body.specialty && await professorHasLessons(id)) {
      return res.status(400).json({ message: 'Cannot change the specialty of a professor with assigned lessons, delete the lessons first' })
    }

    // Get the professor from the database
    const professor = await Professor.findOne({ where: { id } })

    // If the professor doesn't exist, send a 404 status code and a message
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' })
    }

    // Update the professor only with the fields sent in the request body
    professor.set(req.body)
    await professor.save()

    // Remove the password and confirmPassword from the response
    delete professor.dataValues.password
    delete professor.dataValues.confirmPassword

    // Send the updated professor in the response
    res.json(professor)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message }) // If there's an error, send it
  }
}

/**
 * Delete a professor from database by id
 * - If the professor exists, delete it and send it in the response
 * - If the professor doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteProfessor = async (req, res) => {
  // Destructuring the id from the request parameters
  const { id } = req.params

  // Validate if the professor has assigned lessons before deleting it
  if (await professorHasLessons(id)) {
    return res.status(400).json({ message: 'Cannot delete professor with assigned lessons, delete the lessons first or reassign the lessons' })
  }

  try {
    // Delete the professor
    const professor = await Professor.findOne({ where: { id } })
    // Extract the senecaUser from the professor
    const { senecaUser } = professor
    // Delete the professor from the database
    const deletedProfessor = await Professor.destroy({ where: { id } })
    // Delete the user from the database
    const deletedUser = await User.destroy({ where: { senecaUser } })
    // If no rows were deleted, the professor was not found
    if (deletedProfessor === 0 || deletedUser === 0) {
      return res.status(404).json({ message: 'Professor not found' })
    }
    // Send success message
    res.json({ message: 'Professor deleted successfully' })
  } catch (error) {
    // If there's an error, send it
    res.status(500).json({ message: error.message })
  }
}

/**
 * Get all lessons from a professor by id
 * @param {Object} req The request object from Express
 * @param {Object} res The response object from Express
 */
export const getProfessorLessons = async (req, res) => {
  // Destructuring the id from the request parameters
  const { id } = req.params

  try {
    // Get the lessons from the database
    const lessons = await Lesson.findAll({ where: { professorId: id } })
    // Send the lessons in the response as JSON
    res.json(lessons)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}
