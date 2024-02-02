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
    values: ['FP', 'Secundaria']
  }
})

// Relation 1:N between Modules and Lessons
Module.hasMany(Lesson, { foreignKey: { name: 'moduleId', allowNull: false }, sourceKey: 'id' })
Lesson.belongsTo(Module, { foreignKey: { name: 'moduleId', allowNull: false }, targetId: 'id' })
