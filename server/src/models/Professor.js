import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { Lesson } from './Lesson.js'

/**
 * Tabla profesor
 * Contiene los datos de cada profesor.
 * La tabla profesor que cuenta con los siguientes campos:
 * id, usuario de séneca, nombre, apellido1, apellido2, especialidad.
 * • usuario de séneca : combinación de 7 letras seguidas de 3 números sin espacio ni
 * guiones. Ejemplo: dfuebre452 pfrolop854
 * • especialidad: este campo sólo puede tener dos valores: "secundaria" o
 * "formación profesional"
 */
export const Professor = sequelize.define('professors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senecaUser: {
    type: DataTypes.STRING
  },
  name: {
    type: DataTypes.STRING
  },
  firstSurname: {
    type: DataTypes.STRING
  },
  lastSurname: {
    type: DataTypes.STRING
  },
  specialty: {
    type: DataTypes.ENUM,
    values: ['FP', 'Secundaria']
  }
})

// Relation 1:N between Professors and Lessons
Professor.hasMany(Lesson, { foreignKey: 'professorId', sourceKey: 'id' })
Lesson.belongsTo(Professor, { foreignKey: 'professorId', targetId: 'id' })
