"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { apiUrl } from '@/lib/config';

interface User {
  id: string
  email: string
  username: string
  token?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<User>(`${apiUrl}/auth/login`, {
        email,
        password,
      })

      const userData = response.data
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))

      if (userData.token) {
        localStorage.setItem('token', userData.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      }

      router.push('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Login failed')
      }
      throw new Error('An unexpected error occurred')
    }
  }

  const register = async (email: string, username: string, password: string) => {
    try {
      const response = await axios.post<User>(`${apiUrl}/auth/register`, {
        email,
        username,
        password,
      })

      const userData = response.data
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))

      if (userData.token) {
        localStorage.setItem('token', userData.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`
      }

      router.push('/login')
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.message || 'Registration failed')
      }
      throw new Error('An unexpected error occurred')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}