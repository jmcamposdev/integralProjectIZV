import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Lesson } from './Lesson.js'

/**
 * Tabla módulo
 * Se refiere al módulo concreto dentro de la formación
 * La tabla módulo que tiene los siguientes campos:
 * id, id de la formación, denominación, siglas, curso, horas, especialidad.
 * • curso: se refiere si es 1º, 2º, 3º, etc.
 * • horas: número de horas semanales que se imparte ese módulo
 * • especialidad: este campo sólo puede tener dos valores: "secundaria" o "formación
 * profesional".
 * Ejemplos:
 * • id de la formacion: 1234 (id referido a DAW)
 * • denominación: Desarrollo Web en Entorno cliente
 * • siglas: DWEC
 * • curso: 2
 * • horas: 6
 * • especialidad: formación profesional
 */

export const Module = sequelize.define('modules', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  denomination: {
    type: DataTypes.STRING
  },
  acronym: {
    type: DataTypes.STRING
  },
  course: {
    type: DataTypes.INTEGER
  },
  hours: {
    type: DataTypes.INTEGER
  },
  specialty: {
    type: DataTypes.ENUM,
    values: ['FP', 'Secondary']
  }
})

// Relation 1:N between Modules and Lessons
Module.hasMany(Lesson, { foreignKey: { name: 'moduleId', allowNull: false }, sourceKey: 'id' })
Lesson.belongsTo(Module, { foreignKey: { name: 'moduleId', allowNull: false }, targetId: 'id' })

/** ------------------------------------------------------
 * Module Validation
 * ---------------------------------------------------- */

/**
 * All fields are required
 * @param {string} denomination
 * @param {string} acronym
 * @param {number} course
 * @param {number} hours
 * @param {string} specialty
 * @returns {boolean} true if all fields are valid
 */
export const moduleFieldsValidation = (denomination, acronym, course, hours, specialty) => {
  // Valid all the fields to be not null or empty and the specialty to be FP or Secondary
  const validDenomination = denomination?.trim().length > 0
  const validAcronym = acronym?.trim().length > 0
  // Validate that course and hours are numbers and greater than 0
  const validCourse = !isNaN(course) && course > 0
  const validHours = !isNaN(hours) && hours > 0
  const validSpecialty = specialty === 'FP' || specialty === 'Secondary'
  return validDenomination && validAcronym && validCourse && validHours && validSpecialty
}

/**
 * Validate if the module has lessons
 * @param {number} id
 * @returns {boolean} true if the module has lessons
 */
export const moduleHasLessons = async id => {
  const lessons = await Lesson.findAll({ where: { moduleId: id } })
  return lessons.length > 0
}
