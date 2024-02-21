import api from './api'

const moduleService = {
  getAllModules: async () => {
    try {
      const modules = await api.get('modules')
      return modules
    } catch (error) {
      console.error('Error getting modules:', error.message)
      throw error
    }
  },

  createModule: async (module) => {
    try {
      const newModule = await api.post('modules', module)
      return newModule
    } catch (error) {
      console.error('Error creating module:', error.message)
      throw error
    }
  },

  updateModule: async (module) => {
    try {
      const updatedModule = await api.put(`modules/${module.id}`, module)
      return updatedModule
    } catch (error) {
      console.error('Error updating module:', error.message)
      throw error
    }
  },

  deleteModule: async (id) => {
    try {
      await api.delete(`modules/${id}`)
    } catch (error) {
      console.error('Error deleting module:', error.message)
      throw error
    }
  },

  getModuleLessons: async (id) => {
    try {
      const lessons = await api.get(`modules/${id}/lessons`)
      return lessons
    } catch (error) {
      console.error('Error getting module lessons:', error.message)
      throw error
    }
  }
}

export default moduleService
