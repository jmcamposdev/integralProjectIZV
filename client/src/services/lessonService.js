import api from './api'

const lessonService = {
  getAllLessons: async () => {
    try {
      const lessons = await api.get('lessons')
      return lessons
    } catch (error) {
      console.error('Error getting lessons:', error.message)
      throw error
    }
  },

  getCurrentYearLessons: async () => {
    try {
      const lessons = await api.get('lessons-current-year')
      return lessons
    } catch (error) {
      console.error('Error getting current year lessons:', error.message)
      throw error
    }
  },

  createLesson: async (lesson) => {
    try {
      const newLesson = await api.post('lessons', lesson)
      return newLesson
    } catch (error) {
      console.error('Error creating lesson:', error.message)
      throw error
    }
  },

  updateLesson: async (lesson) => {
    try {
      const updatedLesson = await api.put(`lessons/${lesson.id}`, lesson)
      return updatedLesson
    } catch (error) {
      console.error('Error updating lesson:', error.message)
      throw error
    }
  },

  deleteLesson: async (id) => {
    try {
      await api.delete(`lessons/${id}`)
    } catch (error) {
      console.error('Error deleting lesson:', error.message)
      throw error
    }
  }
}

export default lessonService
