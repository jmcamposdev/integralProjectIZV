import api from './api'

const professorService = {
  getAllProfessors: async () => {
    try {
      const professors = await api.get('professors')
      return professors
    } catch (error) {
      console.error('Error getting professors:', error.message)
      throw error
    }
  }
}

export default professorService
