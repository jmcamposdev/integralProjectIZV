import useAuth from '../hooks/useAuth'

const BASE_URL = 'http://localhost:3001/api/v1'

const api = {
  handleResponse: async (response) => {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error de la API')
    }

    return data
  },

  get: async (endpoint) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`)
      return api.handleResponse(response)
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  },

  post: async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      return api.handleResponse(response)
    } catch (error) {
      console.error('Error posting data:', error)
      throw error
    }
  },

  delete: async (endpoint) => {
    const { token } = useAuth()
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        // Pass the token in the Authorization header
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token // Añade el token al encabezado
        }
      })
      return api.handleResponse(response)
    } catch (error) {
      console.error('Error deleting data:', error)
      throw error
    }
  }

}

export default api
