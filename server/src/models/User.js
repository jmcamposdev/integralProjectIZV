import { DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import { sequelize } from '../database/database.js'

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

/**
 * Encrypt the password using bcrypt
 * @param {String} password The password to encrypt
 * @returns {String} The encrypted password
 */
User.encryptPassword = (password) => {
  console.log('encryptPassword', password)
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

/**
 * Compare the password with the received password
 * @param {String} password The password to compare
 * @param {String} receivedPassword The received password to compare
 * @returns {Boolean} True if the password is correct, false otherwise
 */
User.comparePassword = (password, receivedPassword) => {
  return bcrypt.compareSync(password, receivedPassword)
}
