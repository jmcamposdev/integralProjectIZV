import { ROLES, Role } from '../models/Role.js'
import { User } from '../models/User.js'

export const initialSetup = async () => {
  await createRoles()
  await createAdminUser()
}

/**
 * Create then necessary roles in the database
 * ROLES: User, Admin
 * - If there are roles in the database, do nothing
 * - If there are no roles in the database, create them
 */
export const createRoles = async () => {
  // Check if there are roles in the database
  const currentRoles = await Role.findAll()

  // If there are roles, do nothing
  if (currentRoles.length > 0) return

  // If there are no roles, create them
  const roles = [
    { name: 'user' },
    { name: 'admin' }
  ]

  // Create roles
  await Role.bulkCreate(roles)

  console.log('Roles created')
}

export const createAdminUser = async () => {
  // Check if there are users in the database
  const currentUsers = await User.findAll()

  // If there are users, do nothing
  if (currentUsers.length > 0) return

  // If there are no users, create the admin user
  const adminUser = {
    senecaUser: 'admin',
    name: 'admin',
    firstSurname: 'admin',
    lastSurname: 'admin',
    password: await User.encryptPassword('admin'),
    roleId: ROLES.ADMIN
  }

  // Create the admin user
  await User.create(adminUser)

  console.log('Admin user created')
}
