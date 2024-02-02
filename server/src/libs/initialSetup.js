import { Role } from '../models/Role.js'

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
