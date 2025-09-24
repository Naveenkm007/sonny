import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Common/Layout'
import MockDashboard from './pages/MockDashboard'
import MockStudents from './pages/MockStudents'
import MockSubjects from './pages/MockSubjects'
import MockResults from './pages/MockResults'
import MockProfile from './pages/MockProfile'

function App() {
  // Mock user data for demo purposes (bypass authentication)
  const mockUser = {
    id: 1,
    email: 'admin@srms.com',
    role: 'admin',
    is_active: true
  }

  // Directly show the SRMS dashboard without authentication
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<MockDashboard />} />
        <Route path="students" element={<MockStudents />} />
        <Route path="subjects" element={<MockSubjects />} />
        <Route path="results" element={<MockResults />} />
        <Route path="profile" element={<MockProfile />} />
        <Route path="analytics" element={<MockDashboard />} />
        <Route path="settings" element={<MockProfile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App
