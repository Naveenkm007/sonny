import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('mockUser')
    return storedUser ? JSON.parse(storedUser) : null
  })
  const [loading, setLoading] = useState(false)

  // Mock users database
  const mockUsers = {
    'admin@srms.com': {
      id: 1,
      email: 'admin@srms.com',
      password: 'admin123',
      role: 'admin',
      is_active: true,
      firstName: 'Admin',
      lastName: 'User',
      department: 'Administration',
      position: 'System Administrator',
      student_profile: null
    },
    'teacher@srms.com': {
      id: 2,
      email: 'teacher@srms.com',
      password: 'teacher123',
      role: 'teacher',
      is_active: true,
      firstName: 'Teacher',
      lastName: 'Smith',
      department: 'Academic',
      position: 'Senior Teacher',
      student_profile: null
    },
    'student@srms.com': {
      id: 3,
      email: 'student@srms.com',
      password: 'student123',
      role: 'student',
      is_active: true,
      firstName: 'John',
      lastName: 'Doe',
      department: 'Students',
      position: 'Student',
      student_profile: {
        id: 1,
        student_id: 'STU001',
        class_name: '10th Grade',
        section: 'A'
      }
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUser = mockUsers[email]
      if (mockUser && mockUser.password === password) {
        const userWithoutPassword = { ...mockUser }
        delete userWithoutPassword.password
        
        setUser(userWithoutPassword)
        localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword))
        return { success: true, user: userWithoutPassword }
      } else {
        return { success: false, error: 'Invalid email or password' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setUser(null)
      localStorage.removeItem('mockUser')
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Logout failed' }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (profileData) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedUser = { ...user, ...profileData }
      setUser(updatedUser)
      localStorage.setItem('mockUser', JSON.stringify(updatedUser))
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: 'Profile update failed' }
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    // Already handled in useState initializer
    return { success: !!user }
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateProfile,
    checkAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}