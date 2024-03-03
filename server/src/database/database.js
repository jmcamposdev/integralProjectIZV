import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB, {
    host: 'localhost',
    dialect: 'mysql'
  })
