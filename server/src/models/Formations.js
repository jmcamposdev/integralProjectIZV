import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Groups } from './Groups.js'

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
export const Formations = sequelize.define('formations', {
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

Formations.hasMany(Groups, { foreignKey: 'formationId', sourceKey: 'id' })

Groups.belongsTo(Formations, { foreignKey: 'formationId', targetId: 'id' })
