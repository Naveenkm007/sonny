import { 
  Users, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  Clock,
  BarChart3,
  PieChart,
  Target,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Star,
  Zap,
  Plus,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react'

const MockDashboard = () => {
  // Enhanced mock data
  const mockStats = {
    totalStudents: 1247,
    activeSubjects: 15,
    totalResults: 523,
    averageGrade: 'B+',
    passRate: 94.2,
    newEnrollments: 45,
    pendingGrades: 12,
    totalTeachers: 28
  }

  const recentActivities = [
    { id: 1, action: 'New student John Doe enrolled', time: '2 minutes ago', type: 'enrollment' },
    { id: 2, action: 'Results published for Mathematics Class 10A', time: '15 minutes ago', type: 'results' },
    { id: 3, action: 'Teacher Sarah Wilson updated Chemistry syllabus', time: '1 hour ago', type: 'update' },
    { id: 4, action: 'Grade submission deadline reminder sent', time: '2 hours ago', type: 'reminder' },
    { id: 5, action: 'New subject Physics Advanced added', time: '3 hours ago', type: 'subject' }
  ]

  const topPerformers = [
    { name: 'Alice Johnson', class: '12A', gpa: 4.0, subjects: 6, trend: 'up' },
    { name: 'Michael Brown', class: '11B', gpa: 3.95, subjects: 7, trend: 'up' },
    { name: 'Emma Davis', class: '12A', gpa: 3.92, subjects: 6, trend: 'stable' },
    { name: 'James Wilson', class: '11A', gpa: 3.89, subjects: 5, trend: 'up' }
  ]

  const upcomingEvents = [
    { title: 'Mid-term Examinations', date: 'March 15-22', type: 'exam' },
    { title: 'Parent-Teacher Conference', date: 'March 28', type: 'meeting' },
    { title: 'Science Fair', date: 'April 5', type: 'event' },
    { title: 'Grade Submission Deadline', date: 'April 10', type: 'deadline' }
  ]

  const mockRecentResults = [
    {
      id: 1,
      student_name: 'John Doe',
      subject_name: 'Mathematics',
      marks_obtained: 85,
      total_marks: 100,
      grade: 'A',
      created_at: '2024-09-20',
      improvement: '+5%'
    },
    {
      id: 2,
      student_name: 'Jane Smith',
      subject_name: 'Physics',
      marks_obtained: 92,
      total_marks: 100,
      grade: 'A+',
      created_at: '2024-09-19',
      improvement: '+8%'
    },
    {
      id: 3,
      student_name: 'Mike Wilson',
      subject_name: 'Chemistry',
      marks_obtained: 79,
      total_marks: 100,
      grade: 'B+',
      created_at: '2024-09-18',
      improvement: '+2%'
    }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'enrollment': return <Users className="h-4 w-4" />
      case 'results': return <FileText className="h-4 w-4" />
      case 'update': return <BookOpen className="h-4 w-4" />
      case 'reminder': return <Clock className="h-4 w-4" />
      case 'subject': return <GraduationCap className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'enrollment': return 'text-success-600 bg-success-100'
      case 'results': return 'text-info-600 bg-info-100'
      case 'update': return 'text-warning-600 bg-warning-100'
      case 'reminder': return 'text-purple-600 bg-purple-100'
      case 'subject': return 'text-primary-600 bg-primary-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'bg-success-100 text-success-800'
    if (grade === 'B+' || grade === 'B') return 'bg-warning-100 text-warning-800'
    if (grade === 'C+' || grade === 'C') return 'bg-info-100 text-info-800'
    return 'bg-danger-100 text-danger-800'
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Welcome Header */}
      <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-3xl text-white p-8 shadow-colored relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
        
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome Back, Admin! 👋</h1>
            <p className="text-primary-100 text-lg font-medium mb-4">
              Here's what's happening with your school today.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-primary-100">
                <Calendar className="h-4 w-4" />
                <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2 text-primary-100">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Academic Year 2024-25</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning-400 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Students */}
        <div className="stat-card stat-card-primary group cursor-pointer hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Students</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockStats.totalStudents.toLocaleString()}
              </p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-success-600" />
                <span className="text-xs text-success-600 font-medium">+12% from last year</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Subjects */}
        <div className="stat-card stat-card-success group cursor-pointer hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Active Subjects</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockStats.activeSubjects}
              </p>
              <div className="flex items-center space-x-1">
                <CheckCircle2 className="h-3 w-3 text-success-600" />
                <span className="text-xs text-success-600 font-medium">All active</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="h-8 w-8 text-success-600" />
            </div>
          </div>
        </div>

        {/* Pass Rate */}
        <div className="stat-card stat-card-warning group cursor-pointer hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Pass Rate</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockStats.passRate}%
              </p>
              <div className="flex items-center space-x-1">
                <Target className="h-3 w-3 text-success-600" />
                <span className="text-xs text-success-600 font-medium">Above target</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-warning-100 to-warning-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Award className="h-8 w-8 text-warning-600" />
            </div>
          </div>
        </div>

        {/* Average Grade */}
        <div className="stat-card stat-card-info group cursor-pointer hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">Average Grade</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                {mockStats.averageGrade}
              </p>
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3 text-info-600" />
                <span className="text-xs text-info-600 font-medium">Excellent</span>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-info-100 to-info-200 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="h-8 w-8 text-info-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.newEnrollments}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl">
              <Plus className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Grades</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.pendingGrades}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalTeachers}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl">
              <Users className="h-5 w-5 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="card p-6 hover:shadow-medium transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Results</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalResults}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl">
              <BarChart3 className="h-5 w-5 text-pink-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="card-elevated">
            <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary-600" />
                  Recent Activities
                </h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-xl ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-primary-400 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats & Events */}
        <div className="space-y-6">
          {/* Top Performers */}
          <div className="card-elevated">
            <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-success-50 to-success-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Star className="h-5 w-5 mr-2 text-success-600" />
                Top Performers
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topPerformers.map((student, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning-400 rounded-full flex items-center justify-center">
                          <Star className="h-2 w-2 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>Class {student.class}</span>
                        <span>•</span>
                        <span>{student.subjects} subjects</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <p className="text-sm font-bold text-success-600">{student.gpa}</p>
                        {student.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-success-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">GPA</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card-elevated">
            <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-warning-50 to-warning-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-warning-600" />
                Upcoming Events
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-xl ${
                      event.type === 'exam' ? 'bg-danger-100 text-danger-600' :
                      event.type === 'meeting' ? 'bg-info-100 text-info-600' :
                      event.type === 'event' ? 'bg-success-100 text-success-600' :
                      'bg-warning-100 text-warning-600'
                    }`}>
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Results */}
      <div className="card-elevated">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
              Recent Results
            </h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View All Results
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-cell text-left">Student</th>
                <th className="table-cell text-left">Subject</th>
                <th className="table-cell text-left">Score</th>
                <th className="table-cell text-left">Grade</th>
                <th className="table-cell text-left">Improvement</th>
                <th className="table-cell text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentResults.map((result) => (
                <tr key={result.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                        {result.student_name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{result.student_name}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="font-medium text-gray-700">{result.subject_name}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {result.marks_obtained}/{result.total_marks}
                      </span>
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(result.marks_obtained / result.total_marks) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`badge ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3 text-success-500" />
                      <span className="text-xs font-medium text-success-600">{result.improvement}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-sm text-gray-500">
                      {new Date(result.created_at).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="card-elevated">
        <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group flex items-center p-6 border-2 border-gray-200 rounded-2xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl group-hover:scale-110 transition-transform duration-200">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4 text-left">
                <span className="text-sm font-semibold text-gray-900">Manage Students</span>
                <p className="text-xs text-gray-500 mt-1">Add, edit, and organize student records</p>
              </div>
            </button>
            
            <button className="group flex items-center p-6 border-2 border-gray-200 rounded-2xl hover:border-success-300 hover:bg-success-50 transition-all duration-200">
              <div className="p-3 bg-gradient-to-br from-success-100 to-success-200 rounded-2xl group-hover:scale-110 transition-transform duration-200">
                <BookOpen className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4 text-left">
                <span className="text-sm font-semibold text-gray-900">Manage Subjects</span>
                <p className="text-xs text-gray-500 mt-1">Create and organize subject curricula</p>
              </div>
            </button>
            
            <button className="group flex items-center p-6 border-2 border-gray-200 rounded-2xl hover:border-warning-300 hover:bg-warning-50 transition-all duration-200">
              <div className="p-3 bg-gradient-to-br from-warning-100 to-warning-200 rounded-2xl group-hover:scale-110 transition-transform duration-200">
                <FileText className="h-6 w-6 text-warning-600" />
              </div>
              <div className="ml-4 text-left">
                <span className="text-sm font-semibold text-gray-900">View Results</span>
                <p className="text-xs text-gray-500 mt-1">Access and analyze academic results</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockDashboard