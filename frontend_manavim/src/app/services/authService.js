import { authAPI, admin } from '../api/api'

export class AuthService {
  static TOKEN_KEY = 'user_token'
  static USER_KEY = 'user_data'

  static async login(credentials, role) {
    try {
      const response = await authAPI.login(
        credentials.email,
        credentials.password,
        role,
      )
      if (response.data.success && response.data.token) {
        localStorage.setItem(this.TOKEN_KEY, response.data.token)
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  static async register(userData, role) {
    try {
      const { confirmPassword, ...userDataWithoutConfirm } = userData
      const response = await authAPI.register(userDataWithoutConfirm, role)
      console.log(response)
      return response
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }


  static async adminRegister(userData) {
    try {
      const response = await admin.register(userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }

  static async adminLogin(credentials) {
    try {
      const response = await admin.login(credentials)
      if (response.data.success && response.data.token) {
        localStorage.setItem(this.TOKEN_KEY, response.data.token)
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user))
      }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  static logout() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY)
  }

  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static getUser() {
    const user = localStorage.getItem(this.USER_KEY)
    return user ? JSON.parse(user) : null
  }

  static getUserRole() {
    const user = this.getUser()
    return user?.role
  }
}

export default AuthService
