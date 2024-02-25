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
    // Get all formations from database
    const formations = await Formation.findAll()
    // Send the formations in the response as JSON
    res.json(formations)
  } catch (err) {
    // If there's an error, send it
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
    // Destructuring the id from the request parameters
    const { id } = req.params
    // Get the formation from database
    const formation = await Formation.findOne({ where: { id } })
    // If the formation doesn't exist, send a 404 status code and a message
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' })
    }
    // Send the formation in the response as JSON
    res.json(formation)
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

  // If the fields are not valid, send a 400 status code and a message
  if (!formationFieldsValidation(denomination, acronym)) {
    return res.status(400).json({ message: 'Please send denomination and acronym' })
  }

  try {
    // Create the formation
    const formation = await Formation.create({ denomination, acronym })
    // Send the created formation in the response
    res.json(formation)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
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
  // Destructuring the id from the request parameters
  const { id } = req.params

  try {
    // Validate all the fields to be not null or empty
    if (!formationFieldsValidation(req.body.denomination, req.body.acronym)) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Get the formation from database
    const formation = await Formation.findOne({ where: { id } })

    // If the formation doesn't exist, send a 404 status code and a message
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' })
    }

    // Update the formation with the new values from the request body
    formation.set(req.body)
    // Save the updated formation
    await formation.save()
    // Send the updated formation in the response
    res.json(formation)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
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
    // Delete all related groups
    await Group.destroy({ where: { formationId: id } })
    // Delete all related modules
    await Module.destroy({ where: { formationId: id } })

    // If the formation doesn't exist, send a 404 status code and a message
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
    // Destructuring the id from the request parameters
    const { id } = req.params

    // Get all groups from the formation
    const groups = await Group.findAll({ where: { formationId: id } })

    // Send the groups in the response as JSON
    res.json(groups)
  } catch (err) {
    // If there's an error, send it
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
    // Destructuring the id from the request parameters
    const { id } = req.params

    // Get all modules from the formation
    const modules = await Module.findAll({ where: { formationId: id } })

    // Send the modules in the response as JSON
    res.json(modules)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}
