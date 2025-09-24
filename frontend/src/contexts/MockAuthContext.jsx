import { createContext, useContext } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const MockAuthProvider = ({ children }) => {
  // Mock user data for demo purposes (bypass authentication)
  const mockUser = {
    id: 1,
    email: 'admin@srms.com',
    role: 'admin',
    is_active: true,
    firstName: 'Admin',
    lastName: 'User',
    department: 'Administration',
    position: 'System Administrator',
    student_profile: null
  }

  const value = {
    user: mockUser,
    loading: false,
    login: async () => ({ success: true }),
    logout: async () => {},
    updateProfile: async () => ({ success: true }),
    checkAuth: async () => {},
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}