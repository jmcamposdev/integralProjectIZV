import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Lesson } from './Lesson.js'
import { Formation } from './Formation.js'

/**
 * Tabla grupo
 * Se refiere al grupo de alumnos de una formación en un curso escolar, como el grupo 2DAW-B
 * del curso 2013-2014.
 * La tabla grupo que tiene los siguientes campos:
 * id, curso escolar, id de la formación, curso, denominación, turno.
 * • curso escolar: se especifica con dos años. Ejemplo: 2013-2014
 * • curso: se refiere si es 1º, 2º, 3º, etc.
 * • turno: este campo sólo puede tener dos valores: "mañana" o "tarde"
 * Ejemplo:
 * o curso escolar: 2013-2014
 * o id de la formación: 1234 (id referido a DAW)
 * o curso denominación: 2DAWB
 * o turno: tarde
 */

export const Group = sequelize.define('groups', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  schoolYear: {
    type: DataTypes.STRING
  },
  course: {
    type: DataTypes.INTEGER
  },
  denomination: {
    type: DataTypes.STRING
  },
  isMorning: {
    type: DataTypes.BOOLEAN
  }
})

// Relation 1:N between Groups and Lessons
Group.hasMany(Lesson, { foreignKey: { name: 'groupId', allowNull: false }, sourceKey: 'id', onDelete: 'CASCADE' })
Lesson.belongsTo(Group, { foreignKey: { name: 'groupId', allowNull: false }, targetId: 'id' })

/** ------------------------------------------------------
 * Group Validation
 * ---------------------------------------------------- */

/**
 * Validate the fields of a group to create or update
 * All the fields must be not null or empty
 * @param {String} schoolYear The school year of the group
 * @param {Number} course The course of the group
 * @param {String} denomination The denomination of the group
 * @param {Boolean} isMorning The turn of the group
 * @param {Number} formationId The id of the formation of the group
 * @return {Boolean} True if the fields are valid, false otherwise
 */
export const groupFieldsValidation = async (schoolYear, course, denomination, isMorning, formationId) => {
  const validSchoolYear = schoolYear?.trim().length > 0
  const validCourse = !isNaN(course) && course > 0
  const validDenomination = denomination?.trim().length > 0
  const validIsMorning = typeof isMorning === 'boolean'
  const validFormationId = await Formation.findByPk(formationId) !== null
  return validSchoolYear && validCourse && validDenomination && validIsMorning && validFormationId
}

export const groupHasLessons = async (groupId) => {
  return await Lesson.findOne({ where: { groupId } }) !== null
}
