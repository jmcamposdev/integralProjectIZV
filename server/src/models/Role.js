import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js'
import { User } from './User.js'

// Define all Roles types
export const ROLES = {
  user: 1,
  admin: 2
}

// Define the Role model
export const Role = sequelize.define('role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
})

// Relation 1:N between Role and User
Role.hasMany(User, { foreignKey: 'roleId', sourceKey: 'id' })
User.belongsTo(Role, { foreignKey: 'roleId', targetId: 'id' })
