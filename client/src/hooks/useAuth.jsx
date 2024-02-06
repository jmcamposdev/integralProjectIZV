import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  // Get the cookie from the browser
  const cookie = Cookies.get('_auth')

  let isAdmin = null
  let isUser = null
  let role = null

  // If the cookie is available, decode the token and check if it is expired
  if (cookie) {
    // Decode the token
    const decoded = jwtDecode(cookie)
    const isExpired = decoded?.exp < Date.now() / 1000 // Check if the token is expired

    if (isExpired) {
      Cookies.remove('_auth')
    } else {
      isAdmin = decoded?.role === 'admin' // Check if the user is an admin
      isUser = decoded?.role === 'user' // Check if the user is a user
      role = decoded?.role // Get the user's role
    }
  }

  return { isAdmin, isUser, role }
}

export default useAuth
