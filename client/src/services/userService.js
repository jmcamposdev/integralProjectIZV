import api from './api'

const userService = {
  updateUser: async (user) => {
    try {
      const updatedUser = await api.put(`users/${user.senecaUser}`, user)
      return updatedUser
    } catch (error) {
      console.error('Error updating user:', error.message)
      throw error
    }
  }
}

export default userService
