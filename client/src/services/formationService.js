import api from './api'

const formationService = {
  getAllFormations: async () => {
    try {
      const formations = await api.get('formations')
      return formations
    } catch (error) {
      console.error('Error getting formations:', error.message)
      throw error
    }
  },

  createFormation: async (formation) => {
    try {
      const newFormation = await api.post('formations', formation)
      return newFormation
    } catch (error) {
      console.error('Error creating formation:', error.message)
      throw error
    }
  },

  updateFormation: async (formation) => {
    try {
      const updatedFormation = await api.put(`formations/${formation.id}`, formation)
      return updatedFormation
    } catch (error) {
      console.error('Error updating formation:', error.message)
      throw error
    }
  },

  deleteFormation: async (id) => {
    try {
      await api.delete(`formations/${id}`)
    } catch (error) {
      console.error('Error deleting formation:', error.message)
      throw error
    }
  },

  getFormationModules: async (id) => {
    try {
      const modules = await api.get(`formations/${id}/modules`)
      return modules
    } catch (error) {
      console.error('Error getting formation modules:', error.message)
      throw error
    }
  }
}

export default formationService
