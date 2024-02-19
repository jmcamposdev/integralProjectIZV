import { Group, groupFieldsValidation } from '../models/Group.js'

/**
 * Get all groups from database
 * - If there are groups, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getGroups = async (req, res) => {
  // Get all groups from database
  try {
    const groups = await Group.findAll()
    res.json(groups)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/**
 * Get one group from database by id
 * - If the group exists, send it in the response
 * - If the group doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getGroup = async (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  try {
    // Get the group from database
    const group = await Group.findOne({ where: { id } })

    // If the group doesn't exist, send a 404 status code and a message
    if (!group) {
      return res.status(404).json({ message: 'Group not found' })
    }

    // Send the group in the response as JSON
    res.json(group)
  } catch (err) {
    res.status(500).json({ message: err.message }) // If there's an error, send it
  }
}

/**
 * Create a new group in database from the request body
 * - If the request body has { schoolYear, course, denomination, isMorning, formationId }, create the group and send it in the response
 * - If the request body is empty or doesn't have the required fields, send a 400 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createGroup = async (req, res) => {
  const { schoolYear, course, denomination, isMorning, formationId } = req.body

  // Validate the request body
  if (!await groupFieldsValidation(schoolYear, course, denomination, isMorning, formationId)) {
    return res.status(400).json({ message: 'Please send schoolYear, course, denomination, formationId and isMorning' })
  }

  // Create the group
  try {
    const group = await Group.create({ schoolYear, course, denomination, isMorning, formationId })
    res.json(group) // Send the group in the response
  } catch (err) {
    res.status(500).json({ message: err.message }) // If there's an error, send it
  }
}

// TODO - Me he quedado por aquí refactorizando las functiones to async/await y sacando las validaciones al Modelo

/**
 * Update a group from database by id
 * - If the group exists, update it and send it in the response
 * - If the group doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateGroup = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  Group.findOne({ where: { id } })
    .then(group => {
      // If the group doesn't exist, send a 404 status code and a message
      if (!group) {
        return res.status(404).json({ message: 'Group not found' })
      }
      // Update the group
      group.set(req.body)
      group.save()
        .then(group => res.json(group)) // Send the updated group in the response
        .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Delete a group from database by id
 * - If the group exists, delete it and send it in the response 200 status code
 * - If the group doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteGroup = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters

  // Delete the group but if it doesn't exist, send a 404 status code and a message
  Group.destroy({ where: { id } })
    .then(group => {
      // If the group doesn't exist, send a 404 status code and a message
      if (!group) {
        return res.status(404).json({ message: 'Group not found' })
      }
      // Send the group in the response as JSON
      res.json({ message: 'Group deleted successfully' })
    })
    .catch(err => res.status(500).json({ message: err.message }))
}
