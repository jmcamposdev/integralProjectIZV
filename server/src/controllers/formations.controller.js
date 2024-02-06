import { Formation } from '../models/Formation.js'
import { Group } from '../models/Group.js'
import { Module } from '../models/Module.js'

/**
 * Get all formations from database
 * - If there are formations, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getFormations = (req, res) => {
  // Get all formations from database
  Formation.findAll()
    .then(formations => res.json(formations))
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Get one formation from database by id
 * - If the formation exists, send it in the response
 * - If the formation doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getFormation = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters
  Formation.findOne({ where: { id } })
    .then(formation => {
      if (!formation) {
        return res.status(404).json({ message: 'Formation not found' })
      }
      res.json(formation)
    }) // Send the formation in the response as JSON
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Create a new formation in database from the request body
 * - If the request body has { denomination, acronym }, create the formation and send it in the response
 * - If the request body is empty, send a 400 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createFormation = (req, res) => {
  // Destructuring the request body to get the values of the fields
  const { denomination, acronym } = req.body

  // Validate the request body
  if (!denomination || !acronym) {
    return res.status(400).json({ message: 'Please send denomination and acronym' })
  }

  // Create the formation
  Formation.create({ denomination, acronym })
    .then(formation => res.json(formation)) // Send the created formation in the response
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Update a formation from database
 * - If the formation exists, update it and send the updated formation in the response
 * - If the formation doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateFormation = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters
  const { denomination, acronym } = req.body // Destructuring the request body to get the values of the fields

  // Validate the request body
  if (!denomination || !acronym) {
    return res.status(400).json({ message: 'Please send denomination and acronym' })
  }

  // Update if the formation exists but if it doesn't exist send a 404 status code
  Formation.update({ denomination, acronym }, { where: { id } })
    .then(formation => {
      // If the formation doesn't exist, send a 404 status code
      if (!formation[0]) {
        return res.status(404).json({ message: 'Formation not found' })
      }
      // Send the updated formation in the response
      res.json({ id, denomination, acronym })
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Delete a formation from database
 * - If the formation exists, delete it and send a success message in the response 200
 * - If the formation doesn't exist, send a 404 status code
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteFormation = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  // Delete the project but if it doesn't exist send a 404 status code
  Formation.destroy({ where: { id } })
    .then(formation => {
      // If the formation doesn't exist, send a 404 status code
      if (!formation) {
        return res.status(404).json({ message: 'Formation not found' })
      }
      // Send a success message in the response
      res.json({ message: 'Formation deleted successfully' })
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

export const getFormationGroups = (req, res) => {
  const { id } = req.params

  Group.findAll({ where: { formationId: id } })
    .then(groups => res.json(groups))
    .catch(err => res.status(500).json({ message: err.message }))
}

export const getFormationsModules = (req, res) => {
  const { id } = req.params

  Module.findAll({ where: { formationId: id } })
    .then(modules => res.json(modules))
    .catch(err => res.status(500).json({ message: err.message }))
}
