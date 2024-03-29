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

  updateProfessor: async (professor) => {
    try {
      const updatedProfessor = await api.put(`professors/${professor.id}`, professor)
      return updatedProfessor
    } catch (error) {
      console.error('Error updating professor:', error.message)
      throw error
    }
  },

  changeProfessorPassword: async (senecaUser, password) => {
    try {
      const updatedProfessor = await api.put(`users/${senecaUser}`, { password })
      return updatedProfessor
    } catch (error) {
      console.error('Error changing professor password:', error.message)
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
  },

  getProfessorLessons: async (id) => {
    try {
      const lessons = await api.get(`professors/${id}/lessons`)
      return lessons
    } catch (error) {
      console.error('Error getting professor lessons:', error.message)
      throw error
    }
  }
}

export default professorService
