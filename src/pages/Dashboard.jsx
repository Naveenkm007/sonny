import { useAuth } from '../contexts/AuthContext'
import { useQuery } from 'react-query'
import { resultsAPI, studentsAPI, subjectsAPI } from '../services/api'
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp,
  Award,
  Target,
  Calendar,
  BarChart3
} from 'lucide-react'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const Dashboard = () => {
  const { user } = useAuth()

  // Fetch dashboard data based on user role
  const { data: studentsData, isLoading: studentsLoading } = useQuery(
    ['students'],
    () => studentsAPI.getAll({ per_page: 5 }),
    {
      enabled: user?.role === 'admin' || user?.role === 'teacher'
    }
  )

  const { data: subjectsData, isLoading: subjectsLoading } = useQuery(
    ['subjects'],
    () => subjectsAPI.getAll(),
    {
      enabled: user?.role === 'admin' || user?.role === 'teacher'
    }
  )

  const { data: resultsData, isLoading: resultsLoading } = useQuery(
    ['results'],
    () => resultsAPI.getAll({ per_page: 10 }),
    {
      enabled: user?.role === 'admin' || user?.role === 'teacher'
    }
  )

  const { data: studentResults, isLoading: studentResultsLoading } = useQuery(
    ['student-results'],
    () => studentsAPI.getResults(user?.student_profile?.id),
    {
      enabled: user?.role === 'student' && user?.student_profile?.id
    }
  )

  const { data: analytics } = useQuery(
    ['analytics'],
    () => resultsAPI.getAnalytics(),
    {
      enabled: user?.role === 'admin'
    }
  )

  if (studentsLoading || subjectsLoading || resultsLoading || studentResultsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, manage your institution efficiently.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">
                {studentsData?.data?.pagination?.total || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Subjects</p>
              <p className="text-2xl font-semibold text-gray-900">
                {subjectsData?.data?.total || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Results</p>
              <p className="text-2xl font-semibold text-gray-900">
                {resultsData?.data?.pagination?.total || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pass Rate</p>
              <p className="text-2xl font-semibold text-gray-900">
                {analytics?.data?.analytics?.pass_rate?.toFixed(1) || 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Results</h2>
        </div>
        <div className="p-6">
          {resultsData?.data?.results?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Student</th>
                    <th className="table-cell">Subject</th>
                    <th className="table-cell">Marks</th>
                    <th className="table-cell">Grade</th>
                    <th className="table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsData.data.results.slice(0, 5).map((result) => (
                    <tr key={result.id} className="table-row">
                      <td className="table-cell">
                        {result.student?.first_name} {result.student?.last_name}
                      </td>
                      <td className="table-cell">{result.subject?.name}</td>
                      <td className="table-cell">
                        {result.marks_obtained}/{result.total_marks}
                      </td>
                      <td className="table-cell">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          result.grade === 'A+' || result.grade === 'A' 
                            ? 'bg-green-100 text-green-800'
                            : result.grade === 'F' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {result.grade}
                        </span>
                      </td>
                      <td className="table-cell">
                        {new Date(result.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent results</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {user?.student_profile?.first_name || 'Student'}!
        </h1>
        <p className="text-gray-600">Track your academic progress and results.</p>
      </div>

      {/* Student Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current GPA</p>
              <p className="text-2xl font-semibold text-gray-900">
                {studentResults?.data?.gpa || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subjects</p>
              <p className="text-2xl font-semibold text-gray-900">
                {studentResults?.data?.total_results || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Semester</p>
              <p className="text-2xl font-semibold text-gray-900">
                Current
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">My Recent Results</h2>
        </div>
        <div className="p-6">
          {studentResults?.data?.results?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Subject</th>
                    <th className="table-cell">Marks Obtained</th>
                    <th className="table-cell">Total Marks</th>
                    <th className="table-cell">Percentage</th>
                    <th className="table-cell">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {studentResults.data.results.slice(0, 5).map((result) => (
                    <tr key={result.id} className="table-row">
                      <td className="table-cell font-medium">{result.subject?.name}</td>
                      <td className="table-cell">{result.marks_obtained}</td>
                      <td className="table-cell">{result.total_marks}</td>
                      <td className="table-cell">{result.percentage}%</td>
                      <td className="table-cell">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          result.grade === 'A+' || result.grade === 'A' 
                            ? 'bg-green-100 text-green-800'
                            : result.grade === 'F' 
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {result.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No results available</p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {user?.role === 'admin' && renderAdminDashboard()}
      {user?.role === 'teacher' && renderAdminDashboard()}
      {user?.role === 'student' && renderStudentDashboard()}
    </div>
  )
}

export default Dashboard
