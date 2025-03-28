'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/app/services/authService'

export default function AdminRegister() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    role: 'admin',
  })
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(userData)
    try {
      const response = await AuthService.adminRegister(userData)
      console.log("response",response)
      if (response.status === 201) {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Register error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Admin Kayıt
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Kullanıcı Adı"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
            <input
              type="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <input
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Ad Soyad"
              value={userData.fullName}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Şifre"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  )
} 