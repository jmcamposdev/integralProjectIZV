import useSignIn from 'react-auth-kit/hooks/useSignIn'
import useAuth from '../hooks/useAuth'
import api from './api'

const authService = {
  refreshToken: async () => {
    const { token } = useAuth()
    try {
      const response = await api.post('auth/refresh-token', { token })
      console.log(response)
      // const signIn = useSignIn()
      // signIn({
      //   auth: {
      //     token: response.data.accessToken,
      //     type: 'Bearer'
      //   },
      //   userState: {senecaUser}
      // })
      return response
    } catch (error) {
      console.error('Error refreshing token:', error.message)
      throw error
    }
  }
}

export default authService
