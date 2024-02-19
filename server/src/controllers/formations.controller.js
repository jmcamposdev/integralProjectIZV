import { Formation, formationFieldsValidation } from '../models/Formation.js'
import { Group } from '../models/Group.js'
import { Module } from '../models/Module.js'

/**
 * Get all formations from database
 * - If there are formations, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll()
    res.json(formations)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * Get one formation from database by id
 * - If the formation exists, send it in the response
 * - If the formation doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getFormation = async (req, res) => {
  try {
    const { id } = req.params // Destructuring the id from the request parameters
    // Get the formation from database
    const formation = await Formation.findOne({ where: { id } })

    // If the formation doesn't exist, send a 404 status code and a message
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' })
    }

    res.json(formation) // Send the formation in the response as JSON
  } catch (err) {
    res.status(500).json({ message: err.message }) // If there's an error, send it
  }
}

/**
 * Create a new formation in database from the request body
 * - If the request body has { denomination, acronym }, create the formation and send it in the response
 * - If the request body is empty, send a 400 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createFormation = async (req, res) => {
  // Destructuring the request body to get the values of the fields
  const { denomination, acronym } = req.body

  // Validate the request body
  if (!formationFieldsValidation(denomination, acronym)) {
    return res.status(400).json({ message: 'Please send denomination and acronym' })
  }

  try {
    // Create the formation
    const formation = await Formation.create({ denomination, acronym })
    res.json(formation) // Send the created formation in the response
  } catch (err) {
    res.status(500).json({ message: err.message }) // If there's an error, send it
  }
}

/**
 * Update a formation from database
 * - If the formation exists, update it and send the updated formation in the response
 * - If the formation doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateFormation = async (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  try {
    // Validate all the fields to be not null or empty
    if (!formationFieldsValidation(req.body.denomination, req.body.acronym)) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Get the formation from database
    const formation = await Formation.findOne({ where: { id } })

    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' })
    }

    // Update the formation with the new values from the request body
    formation.set(req.body)
    await formation.save()

    // Send the updated formation in the response
    res.json(formation)
  } catch (err) {
    res.status(500).json({ message: err.message }) // If there's an error, send it
  }
}

/**
 * Delete a formation from database
 * - If the formation exists, delete it and send a success message in the response 200
 * - If the formation doesn't exist, send a 404 status code
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteFormation = async (req, res) => {
  try {
    const { id } = req.params // Destructuring the id from the request parameters

    // Delete the formation
    const deletedFormationCount = await Formation.destroy({ where: { id } })

    // If no formation was deleted, send a 404 status code
    if (deletedFormationCount === 0) {
      return res.status(404).json({ message: 'Formation not found' })
    }

    // Send a success message in the response
    res.json({ message: 'Formation deleted successfully' })
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}

/**
 * Get all groups from a formation
 * @param {Object} req The request object from Express
 * @param {Object} res The response object from Express
 */
export const getFormationGroups = async (req, res) => {
  try {
    const { id } = req.params

    const groups = await Group.findAll({ where: { formationId: id } })

    res.json(groups)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * Get all modules from a formation
 * @param {Object} req The request object from Express
 * @param {Object} res The response object from Express
 */
export const getFormationsModules = async (req, res) => {
  try {
    const { id } = req.params

    const modules = await Module.findAll({ where: { formationId: id } })

    res.json(modules)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
