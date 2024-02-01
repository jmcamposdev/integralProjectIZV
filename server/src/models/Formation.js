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
Formation.hasMany(Group, { foreignKey: 'formationId', sourceKey: 'id' })
Group.belongsTo(Formation, { foreignKey: 'formationId', targetId: 'id' })

// Relation 1:N between Formation and Module
Formation.hasMany(Module, { foreignKey: 'formationId', sourceKey: 'id' })
Module.belongsTo(Formation, { foreignKey: 'formationId', targetId: 'id' })
