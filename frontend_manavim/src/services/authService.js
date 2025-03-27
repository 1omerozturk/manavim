import { authAPI, admin } from '@/app/api/api'

export class AuthService {
  static TOKEN_KEY = 'admin_token'
  static USER_KEY = 'admin_user'

  static async login(credentials) {
    try {
      const response = await authAPI.login(
        credentials.email,
        credentials.password,
      )
      localStorage.setItem('token', response.data.token)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  static async register(userData) {
    try {
      // Backend modeliyle uyumlu veri gönderimi
      const { confirmPassword, ...userDataWithoutConfirm } = userData
      const response = await authAPI.register(userDataWithoutConfirm)
      return response.data
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
        // Token ve kullanıcı bilgilerini localStorage'a kaydet
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
}

export default AuthService
