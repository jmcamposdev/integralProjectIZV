import { Module } from '../models/Module.js'
import { Formation } from '../models/Formation.js'

/**
 * Get all modules from database
 * - If there are modules, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getModules = (req, res) => {
  Module.findAll()
    .then((modules) => res.json(modules))
    .catch((err) => res.status(500).json({ message: err.message }))
}

/**
 * Get one module from database by id
 * - If the module exists, send it in the response
 * - If the module doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getModule = (req, res) => {
  const { id } = req.params
  Module.findOne({ where: { id } })
    .then((module) => {
      if (!module) {
        return res.status(404).json({ message: 'Module not found' })
      }
      res.json(module)
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

/**
 * Create a new module in database from the request body
 * - If the request body has { denomination, acronym, course, hours, specialty }, create the module and send it in the response
 * - If the request body is empty, send a 400 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createModule = async (req, res) => {
  try {
    // Destructuring the request body to get the values of the fields
    const { denomination, acronym, course, hours, specialty, formationId } = req.body

    // Validate the request body
    if (!denomination || !acronym || !course || !hours || !specialty || !formationId) {
      return res.status(400).json({ message: 'Please send denomination, acronym, course, hours or specialty' })
    }

    // Validate if the formation exists
    const formation = await Formation.findOne({ where: { id: formationId } })
    if (!formation) {
      return res.status(404).json({ message: 'Formation not found' })
    }

    // Create the module
    const saveModule = await Module.create({ denomination, acronym, course, hours, specialty, formationId })
    // Send the module in the response
    res.json(saveModule)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * Update one module from database by id
 * Only will update same fields that as the database model
 * - If the module exists, update it and send it in the response
 * - If the module doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateModule = (req, res) => {
  const { id } = req.params

  Module.findOne({ where: { id } })
    .then((module) => {
      if (!module) {
        return res.status(404).json({ message: 'Module not found' })
      }
      // Update the module
      module.set(req.body)
      module.save()
        .then((module) => res.json(module))
        .catch((err) => res.status(500).json({ message: err.message }))
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}

/**
 * Delete one module from database by id
 * - If the module exists, delete it and send it in the response
 * - If the module doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteModule = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  // Delete the module
  Module.destroy({ where: { id } })
    .then((module) => {
      // If the module doesn't exist, send a 404 status code and a message
      if (!module) {
        return res.status(404).json({ message: 'Module not found' })
      }
      // If the module exists, send a 204 status code
      res.json({ message: 'Module deleted successfully' })
    })
    .catch((err) => res.status(500).json({ message: err.message }))
}
