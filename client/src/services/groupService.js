import api from './api'

const groupService = {
  getAllGroups: async () => {
    try {
      const groups = await api.get('groups')
      return groups
    } catch (error) {
      console.error('Error getting groups:', error.message)
      throw error
    }
  },

  createGroup: async (group) => {
    try {
      const newGroup = await api.post('groups', group)
      return newGroup
    } catch (error) {
      console.error('Error creating group:', error.message)
      throw error
    }
  },

  updateGroup: async (group) => {
    try {
      const updatedGroup = await api.put(`groups/${group.id}`, group)
      return updatedGroup
    } catch (error) {
      console.error('Error updating group:', error.message)
      throw error
    }
  },

  deleteGroup: async (id) => {
    try {
      await api.delete(`groups/${id}`)
    } catch (error) {
      console.error('Error deleting group:', error.message)
      throw error
    }
  },

  getGroupLessons: async (id) => {
    try {
      const lessons = await api.get(`groups/${id}/lessons`)
      return lessons
    } catch (error) {
      console.error('Error getting group lessons:', error.message)
      throw error
    }
  }
}

export default groupService
