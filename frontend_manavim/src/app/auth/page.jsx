'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AuthSelection() {
  const [selectedRole, setSelectedRole] = useState('customer')

  const roles = [
    { id: 'customer', name: 'Customer' },
    { id: 'producer', name: 'Producer' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Manavim
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please select your role to continue
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    I am a {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-4 justify-center">
              <Link
                href={`/auth/${selectedRole}/login`}
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </Link>
              <Link
                href={`/auth/${selectedRole}/register`}
                className="group relative w-1/2 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
