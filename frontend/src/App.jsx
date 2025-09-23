import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Common/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Subjects from './pages/Subjects'
import Results from './pages/Results'
import Profile from './pages/Profile'
import LoadingSpinner from './components/Common/LoadingSpinner'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      {!user ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        /* Protected routes */
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          
          {/* Admin and Teacher routes */}
          {(user.role === 'admin' || user.role === 'teacher') && (
            <>
              <Route path="students" element={<Students />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="results" element={<Results />} />
            </>
          )}
          
          {/* Student routes */}
          {user.role === 'student' && (
            <>
              <Route path="my-results" element={<Results />} />
            </>
          )}
          
          {/* Admin only routes */}
          {user.role === 'admin' && (
            <>
              <Route path="analytics" element={<Dashboard />} />
              <Route path="settings" element={<Profile />} />
            </>
          )}
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
