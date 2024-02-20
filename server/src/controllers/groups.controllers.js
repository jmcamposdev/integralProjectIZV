import { Group, groupFieldsValidation } from '../models/Group.js'

/**
 * Get all groups from database
 * - If there are groups, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getGroups = async (req, res) => {
  try {
    // Get all groups from database
    const groups = await Group.findAll()
    // Send the groups in the response as JSON
    res.json(groups)
  } catch (err) {
    // If there's an error, send it
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
  // Destructuring the id from the request parameters
  const { id } = req.params

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
    // If there's an error, send it
    res.status(500).json({ message: err.message })
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

  try {
    // Create the group
    const group = await Group.create({ schoolYear, course, denomination, isMorning, formationId })
    // Send the group in the response as JSON
    res.json(group)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
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
export const updateGroup = async (req, res) => {
  // Destructuring the id from the request parameters
  const { id } = req.params
  const { schoolYear, course, denomination, isMorning, formationId } = req.body

  // Validate the request body
  if (!await groupFieldsValidation(schoolYear, course, denomination, isMorning, formationId)) {
    return res.status(400).json({ message: 'Please send schoolYear, course, denomination, formationId and isMorning' })
  }

  try {
    // Get the group from database
    const group = await Group.findOne({ where: { id } })

    // If the group doesn't exist, send a 404 status code and a message
    if (!group) {
      return res.status(404).json({ message: 'Group not found' })
    }

    // Update the group
    group.set(req.body)
    group.save()
    // Send the updated group in the response
    res.json(group)
  } catch (err) {
    // If there's an error, send it
    res.status(500).json({ message: err.message })
  }
}

/**
 * Delete a group from database by id
 * - If the group exists, delete it and send it in the response 200 status code
 * - If the group doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteGroup = async (req, res) => {
  // Destructuring the id from the request parameters
  const { id } = req.params

  try {
    // Delete the group from database
    const deleted = await Group.destroy({ where: { id } })

    // If the group doesn't exist, send a 404 status code and a message
    if (deleted === 0) {
      return res.status(404).json({ message: 'Group not found' })
    }

    // Send a success message in the response
    res.json({ message: 'Group deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
