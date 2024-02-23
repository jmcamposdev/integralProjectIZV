import { DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import { sequelize } from '../database/database.js'

export const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senecaUser: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstSurname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastSurname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

/**
 * Validate all fields are not null or empty and the passwords are the same to create a new user
 * @param {String} senecaUser The seneca user to validate
 * @param {String} name The name to validate
 * @param {String} firstSurname The first surname to validate
 * @param {String} lastSurname The last surname to validate
 * @param {String} password The password to validate
 * @param {String} confirmPassword The confirm password to validate
 * @return {Boolean} True if all fields are valid
 */
User.validateAllFields = (senecaUser, name, firstSurname, lastSurname, password, confirmPassword) => {
  // Validate all the fields to be not null or empty
  const validSenecaUser = senecaUser?.trim().length > 0
  const validName = name?.trim().length > 0
  const validFirstSurname = firstSurname?.trim().length > 0
  const validLastSurname = lastSurname?.trim().length > 0
  const validPassword = password?.trim().length > 0
  const validConfirmPassword = confirmPassword?.trim().length > 0
  const validPasswords = password === confirmPassword

  return validSenecaUser && validName && validFirstSurname && validLastSurname && validPassword && validConfirmPassword && validPasswords
}

/**
 * Validate some fields are not null or empty and the passwords are the same to update a user
 * @param {Object} params The parameters to validate
 * @return {Boolean} True if all fields are valid
 */
User.validateSomeFields = (params) => {
  for (const key in params) {
    if (key === 'id') continue
    if (params[key] === null || params[key] === undefined || params[key]?.trim().length === 0) {
      return false
    }
  }
  return true
}

/**
 * Validate the seneca user is unique in the database
 * @param {String} senecaUser The seneca user to validate
 * @return {Boolean} True if the seneca user is valid
 */
User.exists = async (senecaUser) => {
  const user = await User.findOne({ where: { senecaUser } })
  return user
}

/**
 * Encrypt the password using bcrypt
 * @param {String} password The password to encrypt
 * @returns {String} The encrypted password
 */
User.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

/**
 * Compare the password with the received password
 * @param {String} password The password to compare
 * @param {String} receivedPassword The received password to compare (encrypted)
 * @returns {Boolean} True if the password is correct, false otherwise
 */
User.comparePassword = (password, receivedPassword) => {
  return bcrypt.compareSync(password, receivedPassword)
}
