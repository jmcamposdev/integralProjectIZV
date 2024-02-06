import { Professor } from '../models/Professor.js'

/**
 * Get all professors from database
 * - If there are professors, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getProfessors = (req, res) => {
  Professor.findAll()
    .then(professors => res.json(professors))
    .catch(err => res.status(500).json({
      message: err.message
    }))
}

/**
 * Get one professor from database by id
 * - If the professor exists, send it in the response
 * - If the professor doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getProfessor = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  // Get the professor from database
  Professor.findOne({ where: { id } })
    .then(professor => {
      // If the professor doesn't exist, send a 404 status code and a message
      if (!professor) {
        return res.status(404).json({
          message: 'Professor not found'
        })
      }
      // Send the professor in the response as JSON
      res.json(professor)
    })
    .catch(err => res.status(500).json({
      message: err.message // If there's an error, send it
    }))
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

  if (!senecaUser || !name || !firstSurname || !lastSurname || !specialty) {
    return res.status(400).json({
      message: 'Please send senecaUser, name, firstSurname, lastSurname and specialty'
    })
  }

  try {
    // Validate if the senecaUser already exists
    const existingProfessor = await Professor.findOne({ where: { senecaUser } })

    if (existingProfessor) {
      return res.status(400).json({ message: 'Already exists a professor with that senecaUser' })
    }

    // Validate that the Specialty is valid
    if (specialty !== 'FP' && specialty !== 'Secondary') {
      return res.status(400).json({ message: 'Specialty must be FP or Secondary' })
    }

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

export const updateProfessor = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  // Get the professor from database
  Professor.findOne({ where: { id } })
    .then(professor => {
      // If the professor doesn't exist, send a 404 status code and a message
      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' })
      }

      // Update the professor only with the fields sent in the request body
      // If the field doesn't exist we don't update it
      professor.set(req.body)
      professor.save()
        .then(professor => res.json(professor)) // Send the updated professor in the response
        .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Delete a professor from database by id
 * - If the professor exists, delete it and send it in the response
 * - If the professor doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteProfessor = (req, res) => {
  const { id } = req.params

  // Delete the professor but if there's an error, send it
  Professor.destroy({ where: { id } })
    .then(professor => {
      // If the professor doesn't exist, send a 404 status code and a message
      if (!professor) {
        return res.status(404).json({ message: 'Professor not found' })
      }
      // Send the professor in the response as JSON
      res.json({ message: 'Professor deleted successfully' })
    })
    .catch(err => res.status(500).json({ message: err.message }))
}
