'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa'
import { authAPI } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/services/authService'

export default function AuthPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
    confirmPassword: '',
  })

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await AuthService.login(loginData)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      await AuthService.register(registerData)
      setIsLogin(true)
      setError('Registration successful! Please login.')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-center text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-8">
                Giriş Yap
              </h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Email adresiniz"
                      value={loginData.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Şifreniz"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </motion.button>
              </form>

              <button
                onClick={() => setIsLogin(false)}
                className="mt-4 w-full text-center text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-500 flex items-center justify-center gap-2"
              >
                Yeni hesap oluştur <FaArrowRight size={12} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
              <h2 className="text-center text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-8">
                Yeni Hesap Oluştur
              </h2>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Ad Soyad"
                      value={registerData.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Email adresiniz"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="relative">
                    <FaPhone className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Telefon numarası"
                      value={registerData.phone}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Şifre"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-emerald-600 dark:text-emerald-400" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      className="appearance-none rounded-xl relative block w-full px-10 py-2 border border-slate-200 dark:border-slate-600 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                      placeholder="Şifre Tekrar"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-3 right-3 text-emerald-600 dark:text-emerald-400"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <select
                    name="role"
                    value={registerData.role}
                    onChange={handleRegisterChange}
                    className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  >
                    <option value="customer">Müşteri</option>
                    <option value="producer">Üretici</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  {loading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
                </motion.button>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-sm ${
                      error.includes('successful')
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {error}
                  </motion.div>
                )}
              </form>

              <button
                onClick={() => setIsLogin(true)}
                className="mt-4 w-full text-center text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-500 flex items-center justify-center gap-2"
              >
                Giriş sayfasına dön <FaArrowRight size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
