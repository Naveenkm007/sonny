import { useState } from 'react'
import { Users, Plus, X, Search, Filter, Download, Edit, Trash2, Eye, Star, GraduationCap, Mail, Phone } from 'lucide-react'

const MockStudents = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClass, setSelectedClass] = useState('all')
  const [students, setStudents] = useState([
    {
      id: 1,
      student_id: 'STU001',
      first_name: 'John',
      last_name: 'Doe',
      class_name: '10A',
      section: 'A',
      phone_number: '123-456-7890',
      email: 'john.doe@student.com',
      avatar: null,
      gpa: 3.8,
      status: 'active'
    },
    {
      id: 2,
      student_id: 'STU002',
      first_name: 'Jane',
      last_name: 'Smith',
      class_name: '10A',
      section: 'A',
      phone_number: '123-456-7891',
      email: 'jane.smith@student.com',
      avatar: null,
      gpa: 3.9,
      status: 'active'
    },
    {
      id: 3,
      student_id: 'STU003',
      first_name: 'Mike',
      last_name: 'Wilson',
      class_name: '10B',
      section: 'B',
      phone_number: '123-456-7892',
      email: 'mike.wilson@student.com',
      avatar: null,
      gpa: 3.7,
      status: 'active'
    }
  ])

  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    class_name: '',
    section: '',
    phone_number: '',
    email: ''
  })

  const handleAddStudent = (e) => {
    e.preventDefault()
    
    const studentId = `STU${String(students.length + 1).padStart(3, '0')}`
    const student = {
      id: students.length + 1,
      student_id: studentId,
      ...newStudent,
      avatar: null,
      gpa: 0,
      status: 'active'
    }
    
    setStudents([...students, student])
    setNewStudent({
      first_name: '',
      last_name: '',
      class_name: '',
      section: '',
      phone_number: '',
      email: ''
    })
    setIsAddModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStudent(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredStudents = students.filter(student => {
    const matchesSearch = (
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const matchesClass = selectedClass === 'all' || student.class_name === selectedClass
    return matchesSearch && matchesClass
  })

  const uniqueClasses = [...new Set(students.map(s => s.class_name))]

  const getGradeColor = (gpa) => {
    if (gpa >= 3.7) return 'text-success-600 bg-success-100'
    if (gpa >= 3.0) return 'text-warning-600 bg-warning-100'
    return 'text-danger-600 bg-danger-100'
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-3xl border border-gray-200/50 shadow-soft p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-colored">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Students Management
                </h1>
                <p className="text-gray-600 font-medium">Manage student records and academic information</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card stat-card-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{students.length}</p>
              <p className="text-xs text-success-600 font-medium mt-1">↗ +12% from last month</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Active Students</p>
              <p className="text-3xl font-bold text-gray-900">{students.filter(s => s.status === 'active').length}</p>
              <p className="text-xs text-success-600 font-medium mt-1">100% active rate</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl">
              <GraduationCap className="h-6 w-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Classes</p>
              <p className="text-3xl font-bold text-gray-900">{uniqueClasses.length}</p>
              <p className="text-xs text-warning-600 font-medium mt-1">Across all sections</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-warning-100 to-warning-200 rounded-2xl">
              <Star className="h-6 w-6 text-warning-600" />
            </div>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Avg GPA</p>
              <p className="text-3xl font-bold text-gray-900">3.8</p>
              <p className="text-xs text-info-600 font-medium mt-1">Above average</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-info-100 to-info-200 rounded-2xl">
              <GraduationCap className="h-6 w-6 text-info-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl border border-gray-200/50 shadow-soft p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="input pl-10 pr-8 min-w-32"
              >
                <option value="all">All Classes</option>
                {uniqueClasses.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card-elevated overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">All Students</h2>
            <p className="text-sm text-gray-500 font-medium">{filteredStudents.length} students found</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-cell text-left">Student</th>
                <th className="table-cell text-left">Student ID</th>
                <th className="table-cell text-left">Class</th>
                <th className="table-cell text-left">Contact</th>
                <th className="table-cell text-left">GPA</th>
                <th className="table-cell text-left">Status</th>
                <th className="table-cell text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-colored">
                        {student.first_name[0]}{student.last_name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.first_name} {student.last_name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="font-mono text-sm font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                      {student.student_id}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div>
                      <span className="font-semibold text-gray-900">{student.class_name}</span>
                      <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Section {student.section}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span>{student.phone_number}</span>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getGradeColor(student.gpa)}`}>
                      {student.gpa.toFixed(1)} GPA
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="badge-success">
                      Active
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-2 text-info-600 hover:text-info-700 hover:bg-info-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-warning-600 hover:text-warning-700 hover:bg-warning-50 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-danger-600 hover:text-danger-700 hover:bg-danger-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Add Student Modal */}
      {isAddModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-primary-50 to-primary-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-colored">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Add New Student</h3>
                    <p className="text-sm text-gray-600">Fill in the student details below</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleAddStudent} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full mr-3" />
                  Personal Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={newStudent.first_name}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={newStudent.last_name}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Academic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-success-500 to-success-600 rounded-full mr-3" />
                  Academic Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">
                      Class *
                    </label>
                    <input
                      type="text"
                      name="class_name"
                      value={newStudent.class_name}
                      onChange={handleInputChange}
                      placeholder="e.g., 10A"
                      className="input"
                      required
                    />
                    <p className="form-hint">Enter the class name (e.g., 10A, 11B)</p>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      Section *
                    </label>
                    <input
                      type="text"
                      name="section"
                      value={newStudent.section}
                      onChange={handleInputChange}
                      placeholder="e.g., A"
                      className="input"
                      required
                    />
                    <p className="form-hint">Enter the section (A, B, C, etc.)</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-info-500 to-info-600 rounded-full mr-3" />
                  Contact Information
                </h4>
                
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newStudent.email}
                      onChange={handleInputChange}
                      className="input"
                      placeholder="student@example.com"
                      required
                    />
                    <p className="form-hint">This will be used for notifications and communication</p>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={newStudent.phone_number}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      className="input"
                      required
                    />
                    <p className="form-hint">Primary contact number for emergencies</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MockStudents