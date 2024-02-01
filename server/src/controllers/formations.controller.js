import { Formation } from '../models/Formation.js'

export const getFormations = (req, res) => {
  // Get all formations from database
  Formation.findAll()
    .then(formations => res.json(formations)) // Send the formations in the response as JSON
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

export const createFormation = (req, res) => {
  // Destructuring the request body to get the values of the fields
  const { denomination, acronym } = req.body

  // Validate the request body
  if (!denomination || !acronym) {
    return res.status(400).json({ msg: 'Please send denomination and acronym' })
  }

  // Create the formation
  Formation.create({ denomination, acronym })
    .then(formation => res.json(formation)) // Send the created formation in the response
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}
