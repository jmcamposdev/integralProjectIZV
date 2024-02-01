import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

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
    type: DataTypes.STRING
  },
  denomination: {
    type: DataTypes.STRING
  },
  isMorning: {
    type: DataTypes.BOOLEAN
  }
})
