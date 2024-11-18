'use client'

import api from '@/services/api'
import { createContext, useContext, useEffect, useState } from 'react'
import { IUser } from '@/interfaces/user.interface'
import { IAuthContext } from '@/interfaces/auth-context.interface'
import { usePathname, useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

const TOKEN_KEY = 'accessToken'

const AuthContext = createContext({} as IAuthContext)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem(TOKEN_KEY)

      if (!token) {
        if (!pathname.includes('/login')) router.push('/login')
      } else {
        if (pathname.includes('/login')) router.push('/')
        const response = await api.get('/users/me')
        setUser(response.data)
      }
    }
    loadUser()
  }, [])

  const saveAuthData = async (user: IUser, token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
    setUser(user)
  }
  const register = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        confirmPassword
      })

      saveAuthData(response.data.user, response.data.accessToken)
    } catch (error) {
      console.error(error)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      })
      saveAuthData(response.data.user, response.data.accessToken)
      router.push('/')
    } catch (error: any) {
      toast({
        title: 'Falha na autenticação',
        description: error.response.data.message,
        variant: 'destructive',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }

  const logout = async () => {
    localStorage.removeItem(TOKEN_KEY)
    api.defaults.headers.common['Authorization'] = ''
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
