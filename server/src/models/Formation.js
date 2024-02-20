import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Group } from './Group.js'
import { Module } from './Module.js'

/**
 * Tabla formación
 * Se refiere al ciclo formativo, curso de especialización, ESO, Bachillerato, etc.
 * La tabla formación que tiene los siguientes campos:
 * id, denominación, siglas.
 * Ejemplos:
 * • id: 1234
 * • denominación: Desarrollo de Aplicaciones Web
 * • siglas: DAW
 * • id: 5678
 * • denominación: Curso Especialización de Ciberseguridad
 * • siglas: CIBER
 */
export const Formation = sequelize.define('formations', {
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
  }
})

// Relation 1:N between Formation and Group
Formation.hasMany(Group, { foreignKey: 'formationId', sourceKey: 'id', onDelete: 'CASCADE' })
Group.belongsTo(Formation, { foreignKey: 'formationId', targetId: 'id' })

// Relation 1:N between Formation and Module
Formation.hasMany(Module, { foreignKey: 'formationId', sourceKey: 'id', onDelete: 'CASCADE' })
Module.belongsTo(Formation, { foreignKey: 'formationId', targetId: 'id' })

/** ------------------------------------------------------
 * Formation Validation
 * ---------------------------------------------------- */

/**
 * Validate that the fields are not null or empty
 * @param {String} denomination The name of the formation
 * @param {String} acronym The acronym of the formation
 * @returns {Boolean} true if all fields are valid
 */
export const formationFieldsValidation = (denomination, acronym) => {
  // Validate that the fields are not null or empty
  const validDenomination = denomination?.trim().length > 0
  const validAcronym = acronym?.trim().length > 0
  return validDenomination && validAcronym
}

/**
 * Check if the formation has groups
 * @param {Number} formationId The id of the formation
 * @returns {Boolean} true if the formation has groups
 */
export const formationHasGroups = async (formationId) => {
  // Get all groups of the formation
  const groups = await Group.findAll({ where: { formationId } })
  // Return true if the formation has groups
  return groups.length > 0
}

/**
 * Check if the formation has modules
 * @param {Number} formationId The id of the formation
 * @returns {Boolean} true if the formation has modules
 */
export const formationHasModules = async (formationId) => {
  // Get all modules of the formation
  const modules = await Module.findAll({ where: { formationId } })
  // Return true if the formation has modules
  return modules.length > 0
}

/**
 * Check if the formation exists
 * @param {Number} id The formation id
 * @return {Boolean} true if the formation exists
 */
export const formationExists = async (id) => {
  // Get the formation from database
  const formation = await Formation.findOne({ where: { id } })
  // Return true if the formation exists
  return !!formation
}
