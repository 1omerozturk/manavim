import { authAPI, admin } from '../api/api'
import { signIn, signOut } from 'next-auth/react'

// Helper to safely check if we're in a browser environment
const isBrowser = () => typeof window !== 'undefined'

export class AuthService {
  static TOKEN_KEY = 'user_token'
  static USER_KEY = 'user_data'

  static async login(credentials, role) {
    try {
      console.log("AuthService: Direct API login attempt", { role, email: credentials.email });
      
      // Try direct API login
      const response = await authAPI.login(
        credentials.email,
        credentials.password,
        role,
      )
      
      console.log("AuthService: API response:", response.status, response.data);
      
      // Check for token existence instead of success flag
      if (response.data?.token && isBrowser()) {
        console.log("AuthService: Storing credentials in localStorage");
        localStorage.setItem(this.TOKEN_KEY, response.data.token)
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user))
        
        // Add success flag for consistent handling
        return { 
          success: true, 
          token: response.data.token,
          user: response.data.user 
        }
      }
      
      console.log("AuthService: Login failed or no token in response");
      return { success: false, message: response.data?.message || 'Login failed' }
    } catch (error) {
      console.error('AuthService: API login error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Login failed')
    }
  }

  static async register(userData, role) {
    try {
      const { confirmPassword, ...userDataWithoutConfirm } = userData
      const response = await authAPI.register(userDataWithoutConfirm, role)
      
      // Check for successful response status
      if (response.status >= 200 && response.status < 300) {
        return response
      }
      
      throw new Error(response.data?.message || 'Registration failed')
    } catch (error) {
      console.error('API register error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Registration failed')
    }
  }

  static async adminRegister(userData) {
    try {
      const response = await admin.register(userData)
      
      // Check for successful response
      if (response.status >= 200 && response.status < 300) {
        return response.data
      }
      
      throw new Error(response.data?.message || 'Registration failed')
    } catch (error) {
      console.error('API admin register error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Registration failed')
    }
  }

  static async adminLogin(credentials) {
    try {
      console.log("AuthService: Direct API admin login attempt", { email: credentials.email });
      
      // Try direct API login
      const response = await admin.login(credentials)
      
      console.log("AuthService: Admin API response:", response.status, response.data);
      
      // Check for token existence instead of success flag
      if (response.data?.token && isBrowser()) {
        console.log("AuthService: Storing admin credentials in localStorage");
        localStorage.setItem(this.TOKEN_KEY, response.data.token)
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user))
        
        // Add success flag for consistent handling
        return { 
          success: true, 
          token: response.data.token,
          user: response.data.user 
        }
      }
      
      console.log("AuthService: Admin login failed or no token in response");
      return { success: false, message: response.data?.message || 'Login failed' }
    } catch (error) {
      console.error('AuthService: API admin login error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Login failed')
    }
  }

  static async logout() {
    try {
      // Clear localStorage
      if (isBrowser()) {
        localStorage.removeItem(this.TOKEN_KEY)
        localStorage.removeItem(this.USER_KEY)
      }
      
      return { success: true }
    } catch (error) {
      console.error('Logout error:', error)
      return { success: false, error: error.message }
    }
  }

  static isAuthenticated() {
    if (!isBrowser()) return false
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  static getToken() {
    if (!isBrowser()) return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static getUser() {
    if (!isBrowser()) return null
    const user = localStorage.getItem(this.USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static getUserRole() {
    if (!isBrowser()) return null
    const user = this.getUser()
    return user?.role
  }
}

export default AuthService
