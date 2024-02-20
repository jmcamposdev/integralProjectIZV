import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
  // Get the cookie from the browser
  const cookie = Cookies.get('_auth')

  let isAdmin = null
  let isUser = null
  let role = null
  let isLogged = false
  const senecaUser = null
  let name = null
  let firstSurname = null
  let lastSurname = null
  let token = null

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
      isLogged = true
      name = decoded?.name // Get the user's name
      firstSurname = decoded?.firstSurname // Get the user's first surname
      lastSurname = decoded?.lastSurname // Get the user's last surname
      token = cookie
    }
  }

  return { senecaUser, name, firstSurname, lastSurname, isAdmin, isUser, role, isLogged, token }
}

export default useAuth
