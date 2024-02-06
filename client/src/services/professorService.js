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
  },

  createProfessor: async (professor) => {
    try {
      const newProfessor = await api.post('professors', professor)
      return newProfessor
    } catch (error) {
      console.error('Error creating professor:', error.message)
      throw error
    }
  },

  deleteProfessor: async (id) => {
    try {
      await api.delete(`professors/${id}`)
    } catch (error) {
      console.error('Error deleting professor:', error.message)
      throw error
    }
  }
}

export default professorService
