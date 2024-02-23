import api from './api'

const authService = {
  refreshToken: async (senecaUser) => {
    try {
      const response = await api.post('auth/refresh-token', { senecaUser })
      const { token } = response
      return token
    } catch (error) {
      console.error('Error refreshing token:', error.message)
      throw error
    }
  }
}

export default authService
