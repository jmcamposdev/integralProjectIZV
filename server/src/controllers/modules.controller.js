import { Module } from '../models/Module.js'

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
export const createModule = (req, res) => {
  // Destructuring the request body to get the values of the fields
  const { denomination, acronym, course, hours, specialty } = req.body

  // Validate the request body
  if (!denomination || !acronym || !course || !hours || !specialty) {
    return res.status(400).json({ msg: 'Please send denomination, acronym, course, hours and specialty' })
  }

  // Create the module
  Module.create({ denomination, acronym, course, hours, specialty })
    .then((module) => res.json(module))
    .catch((err) => res.status(500).json({ message: err.message }))
}

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
