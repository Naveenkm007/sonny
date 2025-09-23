import { useState } from 'react'
import { useQuery } from 'react-query'
import { studentsAPI } from '../services/api'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const Students = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading, error } = useQuery(
    ['students', { search, page }],
    () => studentsAPI.getAll({ search, page, per_page: 10 }),
    {
      keepPreviousData: true
    }
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        Error loading students: {error.message}
      </div>
    )
  }

  const students = data?.data?.students || []
  const pagination = data?.data?.pagination || {}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600">Manage student records and information</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} className="mr-2" />
          Add Student
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <button className="btn-outline">Filter</button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="table-header">
                <th className="table-cell">Student ID</th>
                <th className="table-cell">Name</th>
                <th className="table-cell">Email</th>
                <th className="table-cell">Class</th>
                <th className="table-cell">Section</th>
                <th className="table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="table-row">
                  <td className="table-cell font-medium">{student.student_id}</td>
                  <td className="table-cell">{student.full_name}</td>
                  <td className="table-cell">{student.user?.email}</td>
                  <td className="table-cell">{student.class_name || 'N/A'}</td>
                  <td className="table-cell">{student.section || 'N/A'}</td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.per_page) + 1} to{' '}
                {Math.min(pagination.page * pagination.per_page, pagination.total)} of{' '}
                {pagination.total} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.has_prev}
                  className="btn-outline disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.has_next}
                  className="btn-outline disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Students
