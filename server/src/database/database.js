import Sequelize from 'sequelize'

export const sequelize = new Sequelize(
  'eduAssignment',
  'root',
  '', {
    hots: 'localhost',
    dialect: 'mysql'
  })
