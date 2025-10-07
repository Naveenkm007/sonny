import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/MockAuthContext'
import Layout from './components/Common/Layout'
import MockLogin from './pages/MockLogin'
import MockDashboard from './pages/MockDashboard'
import MockStudents from './pages/MockStudents'
import MockSubjects from './pages/MockSubjects'
import MockResults from './pages/MockResults'
import MockProfile from './pages/MockProfile'
import MockSettings from './pages/MockSettings'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {!user ? (
        // Public routes - not authenticated
        <>
          <Route path="/login" element={<MockLogin />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        // Protected routes - authenticated
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<MockDashboard />} />
          <Route path="students" element={<MockStudents />} />
          <Route path="subjects" element={<MockSubjects />} />
          <Route path="results" element={<MockResults />} />
          <Route path="profile" element={<MockProfile />} />
          <Route path="analytics" element={<MockDashboard />} />
          <Route path="settings" element={<MockSettings />} />
          <Route path="login" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      )}
    </Routes>
  )
}

export default App
