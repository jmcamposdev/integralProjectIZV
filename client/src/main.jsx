import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './css/style.css'
import './css/satoshi.css'
import 'jsvectormap/dist/css/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider
    store={store}
  >
    <Router>
      <App />
    </Router>
  </AuthProvider>
)
