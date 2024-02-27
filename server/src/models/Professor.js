import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Lesson } from './Lesson.js'

export const Professor = sequelize.define('professors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senecaUser: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstSurname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastSurname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialty: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['FP', 'Secondary']
  }
})

// Relation 1:N between Professors and Lessons
Professor.hasMany(Lesson, { foreignKey: 'professorId', sourceKey: 'id' })
Lesson.belongsTo(Professor, { foreignKey: 'professorId', targetId: 'id' })

/** ------------------------------------------------------
 * Professor Validation
 * ---------------------------------------------------- */

/**
 * All fields are required
 * @param {string} senecaUser
 * @param {string} name
 * @param {string} firstSurname
 * @param {string} lastSurname
 * @param {string} specialty
 * @returns {boolean} true if all fields are valid
 */
export const professorFieldsValidation = (senecaUser, name, firstSurname, lastSurname, specialty, password, confirmPassword) => {
  // Valid all the fields to be not null or empty and the specialty to be FP or Secondary
  // To be valid seneca user must be not null or empty and cant contain UpperCase letters, spaces or special characters
  const validSenecaUser = senecaUser?.trim().length > 0 && !/[A-Z\s!@#$%^&*(),.?":{}|<>]/.test(senecaUser)
  const validName = name?.trim().length > 0
  const validFirstSurname = firstSurname?.trim().length > 0
  const validLastSurname = lastSurname?.trim().length > 0
  const validSpecialty = specialty === 'FP' || specialty === 'Secondary'
  const validPassword = password?.trim().length > 0
  const validConfirmPassword = confirmPassword?.trim().length > 0
  const validPasswords = password === confirmPassword
  return validSenecaUser && validName && validFirstSurname && validLastSurname && validSpecialty && validPassword && validConfirmPassword && validPasswords
}

/**
 * Validate some fields of the professor this is used to update
 * @param {Array[Object]} params The object with the fields to validate
 * @returns {boolean} true if all fields are valid
 */
export const professorValidateSomeFields = (params) => {
  // Iterate over the object keys and validate the fields
  for (const key in params) {
    // If is the id, continue
    if (key === 'id') {
      continue
    }
    // Validate the specialty to be FP or Secondary
    if (key === 'specialty' && (params[key] !== 'FP' && params[key] !== 'Secondary')) {
      return false
    }
    // Validate the senecaUser, name, firstSurname and lastSurname to be not null or empty
    if (key !== 'specialty' && (!params[key] || params[key].trim().length === 0)) {
      return false
    }
  }
  return true
}

/**
 * Validate if the professor exists
 * @param {string} senecaUser
 * @returns {boolean}
 */
export const professorExists = async (senecaUser) => {
  try {
    // Find the professor by senecaUser
    const professor = await Professor.findOne({ where: { senecaUser } })
    // Return true if the professor exists
    return professor !== null
  } catch (err) {
    // If there's an error, return false
    return false
  }
}

/**
 * Validate if the professor has lessons
 * @param {Number} professorId The id of the professor
 * @returns {boolean} true if the professor has lessons
 */
export const professorHasLessons = async (professorId) => {
  try {
    // Get all lessons of the professor
    const lessons = await Lesson.findAll({ where: { professorId } })
    // Return true if the professor has lessons
    return lessons.length > 0
  } catch (err) {
    // If there's an error, return false
    return false
  }
}
