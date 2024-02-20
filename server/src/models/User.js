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
