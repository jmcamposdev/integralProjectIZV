import { Op } from 'sequelize'
import { Group } from '../models/Group.js'
import { Lesson } from '../models/Lesson.js'
import { Module } from '../models/Module.js'
import { Professor } from '../models/Professor.js'

/**
 * Get all lessons from database
 * - If there are lessons, send them in the response
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getLessons = (req, res) => {
  // Get all lessons from database
  Lesson.findAll()
    .then(lessons => res.json(lessons)) // Send the lessons in the response as JSON
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Get one lesson from database by id
 * - If the lesson exists, send it in the response
 * - If the lesson doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getLesson = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters
  Lesson.findOne({ where: { id } })
    .then(lesson => {
      // If the lesson doesn't exist, send a 404 status code and a message
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' })
      }
      // Send the lesson in the response as JSON
      res.json(lesson)
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Create a new lesson in database from the request body
 * - If the request body has { groupId, moduleId, professorId, hours }, create the lesson and send it in the response
 * Validate that the ids exist in the database before creating the lesson
 * - If the request body is empty or doesn't have the required fields, send a 400 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createLesson = async (req, res) => {
  const { groupId, moduleId, professorId, hours } = req.body

  // Validate the request body
  if (!groupId || !moduleId || !hours) {
    return res.status(400).json({ message: 'Please send groupId, moduleId, professorId or hours' })
  }

  // Validate that the ids exist in the database
  const group = await Group.findOne({ where: { id: groupId } })
  if (!group) {
    return res.status(400).json({ message: 'Group not found' })
  }
  const selectedModule = await Module.findOne({ where: { id: moduleId } })
  if (!selectedModule) {
    return res.status(400).json({ message: 'Module not found' })
  }

  // Validate that the group course is the same as the module course
  if (group.course !== selectedModule.course) {
    return res.status(400).json({ message: 'The group course is not the same as the module course' })
  }

  // The professor can be null if there's no professor assigned to the lesson
  if (professorId) {
    const professor = await Professor.findOne({ where: { id: professorId } })
    if (!professor) {
      return res.status(400).json({ message: 'Professor not found' })
    }
  }

  // Create the lesson
  Lesson.create({ groupId, moduleId, professorId, hours })
    .then(lesson => res.json(lesson)) // Send the created lesson in the response
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Update a lesson in database by id from the request body
 * - If the lesson exists, update it and send it in the response
 * - If the lesson doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateLesson = async (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters
  const { groupId, moduleId, professorId } = req.body

  // Validate that the ids exist in the database
  if (groupId) {
    const group = await Group.findOne({ where: { id: groupId } })
    if (!group) {
      return res.status(400).json({ message: 'Group not found' })
    }
  }
  if (moduleId) {
    const selectedModule = await Module.findOne({ where: { id: moduleId } })
    if (!selectedModule) {
      return res.status(400).json({ message: 'Module not found' })
    }
  }
  if (professorId) {
    const professor = await Professor.findOne({ where: { id: professorId } })
    if (!professor) {
      return res.status(400).json({ message: 'Professor not found' })
    }
  }

  // Update the lesson
  Lesson.findOne({ where: { id } })
    .then(lesson => {
      // If the lesson doesn't exist, send a 404 status code and a message
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' })
      }
      // Update the lesson
      lesson.set(req.body)
      lesson.save()
        .then(updatedLesson => res.json(updatedLesson)) // Send the updated lesson in the response
        .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

/**
 * Delete a lesson in database by id
 * - If the lesson exists, delete it
 * - If the lesson doesn't exist, send a 404 status code and a message
 * - If there's an error, send it
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteLesson = (req, res) => {
  const { id } = req.params // Destructuring the id from the request parameters
  Lesson.destroy({ where: { id } })
    .then(num => {
      // If the lesson doesn't exist, send a 404 status code and a message
      if (num === 0) {
        return res.status(404).json({ message: 'Lesson not found' })
      }
      // Send a 204 status code
      res.json({ message: 'Lesson deleted successfully' })
    })
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}

export const getCurrentYearLessons = async (req, res) => {
  const currentYear = new Date().getFullYear()

  // Get all lessons, professors, modules from the current year
  // The currentYear field are in the Group and the format is '2021/2022'
  const lessons = await Lesson.findAll({
    include: [
      {
        model: Group,
        where: {
          schoolYear: {
            // Must include the current year in the Group currentYear field in first position (2021/2022)
            [Op.startsWith]: `${currentYear}/`
          }
        }
      },
      {
        model: Module
      },
      {
        model: Professor
      }
    ]
  })

  if (lessons.length === 0) {
    return res.status(404).json({ message: 'Lessons not found' })
  }

  res.json(lessons)
}

/**
 * Generate lessons for all Groups and Modules and the Professor to Null
 * @param {Object} req The request object from Express
 * @param {Object} res The response object from Express
 */
export const generateLessons = async (req, res) => {
  // Get all groups from the current year
  const groups = await Group.findAll()

  if (groups.length === 0) {
    return res.status(404).json({ message: 'Groups not found' })
  }

  // Get all modules from the current year
  const modules = await Module.findAll()

  if (modules.length === 0) {
    return res.status(404).json({ message: 'Modules not found' })
  }

  // Generate lessons for all Groups and Modules and the Professor to Null
  const lessons = []
  groups.forEach(group => {
    // Find all modules that have the same course as the group and the same formationId
    const groupModules = modules.filter(module => module.course === group.course && module.formationId === group.formationId)
    groupModules.forEach(module => {
      lessons.push({
        groupId: group.id,
        moduleId: module.id,
        professorId: null,
        hours: 0
      })
    })
  })

  // Create the lessons
  Lesson.bulkCreate(lessons)
    .then((response) => {
      res.json(response)
    }) // Send a message
    .catch(err => res.status(500).json({ message: err.message })) // If there's an error, send it
}
