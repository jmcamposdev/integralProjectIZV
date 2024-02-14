import { Sequelize } from 'sequelize'
import { Professor, professorExists, professorFieldsValidation, professorHasLessons } from '../models/Professor.js'
import { Lesson } from '../models/Lesson.js'

/**
 * Get all professors from database
 * - If there are professors, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getProfessors = async (req, res) => {
  try {
    const professors = await Professor.findAll()
    res.json(professors)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
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
    const { id } = req.params // Destructuring the id from the request parameters

    // Get the professor from database
    const professor = await Professor.findOne({ where: { id } })

    // If the professor doesn't exist, send a 404 status code and a message
    if (!professor) {
      return res.status(404).json({
        message: 'Professor not found'
      })
    }

    // Send the professor in the response as JSON
    res.json(professor)
  } catch (err) {
    res.status(500).json({
      message: err.message // If there's an error, send it
    })
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
  const {
    senecaUser,
    name,
    firstSurname,
    lastSurname,
    specialty
  } = req.body

  // Validate that all fields are not empty
  if (!professorFieldsValidation(senecaUser, name, firstSurname, lastSurname, specialty)) {
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

    res.json(createdProfessor)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProfessor = async (req, res) => {
  const { id } = req.params

  try {
    // Validate that there isn't a professor with the same senecaUser
    const existingProfessor = await Professor.findOne({
      where: {
        senecaUser: req.body.senecaUser,
        id: { [Sequelize.Op.ne]: req.body.id }
      }
    })

    if (existingProfessor) {
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
    // If the field doesn't exist, we don't update it
    professor.set(req.body)
    await professor.save()

    res.json(professor) // Send the updated professor in the response
  } catch (err) {
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
    return res.status(400).json({ message: 'Cannot delete professor with assigned lessons, delete the lessons first' })
  }

  try {
    // Delete the professor
    const deletedProfessor = await Professor.destroy({ where: { id } })
    // If no rows were deleted, the professor was not found
    if (deletedProfessor === 0) {
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
    const lessons = await Lesson.findAll({
      where: {
        professorId: id
      }
    })

    // Send the lessons in the response as JSON
    res.json(lessons)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}
