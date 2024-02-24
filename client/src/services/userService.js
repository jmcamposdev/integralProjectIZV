import useAuth from '../hooks/useAuth'
import api from './api'

const userService = {
  updateUser: async (user) => {
    // Get the user from the token
    const { senecaUser } = useAuth()

    if (senecaUser === user.senecaUser) {
      delete user.senecaUser
    }

    try {
      // Update the user in the database
      const updatedUser = await api.put(`users/${senecaUser}`, user)
      // Return the updated user
      return updatedUser
    } catch (error) {
      console.error('Error updating user:', error.message)
      throw error
    }
  }
}

export default userService
