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
export const professorFieldsValidation = (senecaUser, name, firstSurname, lastSurname, specialty) => {
  // Valid all the fields to be not null or empty and the specialty to be FP or Secondary
  const validSenecaUser = senecaUser?.trim().length > 0
  const validName = name?.trim().length > 0
  const validFirstSurname = firstSurname?.trim().length > 0
  const validLastSurname = lastSurname?.trim().length > 0
  const validSpecialty = specialty === 'FP' || specialty === 'Secondary'
  return validSenecaUser && validName && validFirstSurname && validLastSurname && validSpecialty
}

/**
 * Validate if the professor exists
 * @param {string} senecaUser
 * @returns {boolean}
 */
export const professorExists = async (senecaUser) => {
  const professor = await Professor.findOne({ where: { senecaUser } })
  return professor !== null
}
