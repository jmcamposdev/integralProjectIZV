import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'

/**
 * Tabla lección
 * La tabla lección es la que asigna un módulo de un curso a un profesor. Por ejemplo: el módulo
 * DWEC del grupo 2DAWB del curso 2013-2014 se asigna al profesor Daniel Fuentes.
 * La tabla lección que tiene los siguientes campos:
 * id, id del grupo, id del módulo, id del profesor, horas.
 */
export const Lesson = sequelize.define('lessons', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  hours: {
    type: DataTypes.INTEGER
  }
})
