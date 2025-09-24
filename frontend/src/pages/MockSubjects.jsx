import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  BookOpenIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const MockSubjects = () => {
  const { theme } = useTheme();
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      code: '22CSE51',
      name: 'Software Engineering and Project Management',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 4,
      type: 'Theory',
      faculty: 'Dr. Rajesh Kumar',
      students: 45,
      status: 'Active',
      description: 'Comprehensive study of software engineering principles and project management methodologies.',
      prerequisites: ['Data Structures', 'Object Oriented Programming']
    },
    {
      id: 2,
      code: '22CSE52',
      name: 'Design and Analysis of Algorithms',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 3,
      type: 'Theory',
      faculty: 'Prof. Anita Sharma',
      students: 42,
      status: 'Active',
      description: 'Advanced algorithmic techniques and complexity analysis.',
      prerequisites: ['Data Structures', 'Mathematics']
    },
    {
      id: 3,
      code: '22CSL52',
      name: 'Design and Analysis of Algorithms Lab',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 1,
      type: 'Lab',
      faculty: 'Dr. Priya Mehta',
      students: 42,
      status: 'Active',
      description: 'Practical implementation of algorithmic concepts.',
      prerequisites: ['Design and Analysis of Algorithms']
    },
    {
      id: 4,
      code: '22CSE53',
      name: 'Database Management Systems',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 3,
      type: 'Theory',
      faculty: 'Dr. Vikram Singh',
      students: 48,
      status: 'Active',
      description: 'Comprehensive study of database design, implementation, and management.',
      prerequisites: ['Data Structures']
    },
    {
      id: 5,
      code: '22CSL53',
      name: 'Database Management Systems Lab',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 1,
      type: 'Lab',
      faculty: 'Prof. Meera Joshi',
      students: 48,
      status: 'Active',
      description: 'Hands-on experience with database implementation and SQL.',
      prerequisites: ['Database Management Systems']
    },
    {
      id: 6,
      code: '22CSE54X',
      name: 'Professional Elective Course-I',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 3,
      type: 'Elective',
      faculty: 'Dr. Arun Patel',
      students: 35,
      status: 'Active',
      description: 'Specialized courses in emerging technologies.',
      prerequisites: ['Core Subjects']
    },
    {
      id: 7,
      code: '22RMK55',
      name: 'Research Methodology and IPR',
      semester: '5th Semester',
      department: 'General',
      credits: 2,
      type: 'Theory',
      faculty: 'Dr. Sunita Rao',
      students: 50,
      status: 'Active',
      description: 'Research methodologies and intellectual property rights.',
      prerequisites: []
    },
    {
      id: 8,
      code: '22SDK56',
      name: 'Critical and Creative Thinking Skills',
      semester: '5th Semester',
      department: 'General',
      credits: 2,
      type: 'Theory',
      faculty: 'Prof. Ravi Kumar',
      students: 50,
      status: 'Active',
      description: 'Development of analytical and creative thinking abilities.',
      prerequisites: []
    },
    {
      id: 9,
      code: '22ESK57',
      name: 'Environmental Studies',
      semester: '5th Semester',
      department: 'General',
      credits: 1,
      type: 'Theory',
      faculty: 'Dr. Kavita Sharma',
      students: 50,
      status: 'Active',
      description: 'Environmental awareness and sustainability studies.',
      prerequisites: []
    },
    {
      id: 10,
      code: '22CSE58',
      name: 'Mini Project-II',
      semester: '5th Semester',
      department: 'Computer Science',
      credits: 2,
      type: 'Project',
      faculty: 'Dr. Amit Gupta',
      students: 45,
      status: 'Active',
      description: 'Practical project implementation using learned concepts.',
      prerequisites: ['Mini Project-I']
    },
    {
      id: 11,
      code: '22NSS50',
      name: 'National Service Scheme (NSS)',
      semester: '5th Semester',
      department: 'General',
      credits: 0,
      type: 'Activity',
      faculty: 'Col. Rajesh Verma',
      students: 30,
      status: 'Active',
      description: 'Community service and social awareness programs.',
      prerequisites: []
    },
    {
      id: 12,
      code: '22PED50',
      name: 'Physical Education (PE) (Sports and Athletics)',
      semester: '5th Semester',
      department: 'Physical Education',
      credits: 1,
      type: 'Activity',
      faculty: 'Mr. Suresh Reddy',
      students: 50,
      status: 'Active',
      description: 'Physical fitness and sports activities.',
      prerequisites: []
    },
    {
      id: 13,
      code: '22YOG50',
      name: 'Yoga',
      semester: '5th Semester',
      department: 'Physical Education',
      credits: 1,
      type: 'Activity',
      faculty: 'Ms. Priyanka Jain',
      students: 40,
      status: 'Active',
      description: 'Yoga practices for physical and mental well-being.',
      prerequisites: []
    }
  ]);

  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newSubject, setNewSubject] = useState({
    code: '',
    name: '',
    semester: '',
    department: '',
    credits: '',
    type: '',
    faculty: '',
    description: '',
    prerequisites: []
  });

  // Get unique values for filters
  const departments = [...new Set(subjects.map(subject => subject.department))];
  const types = [...new Set(subjects.map(subject => subject.type))];
  const semesters = [...new Set(subjects.map(subject => subject.semester))];

  // Statistics
  const stats = {
    total: subjects.length,
    active: subjects.filter(s => s.status === 'Active').length,
    theory: subjects.filter(s => s.type === 'Theory').length,
    lab: subjects.filter(s => s.type === 'Lab').length,
    project: subjects.filter(s => s.type === 'Project').length,
    totalCredits: subjects.reduce((sum, s) => sum + s.credits, 0),
    totalStudents: subjects.reduce((sum, s) => sum + s.students, 0)
  };

  // Filter subjects
  useEffect(() => {
    let filtered = subjects.filter(subject => {
      const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           subject.faculty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'All' || subject.department === selectedDepartment;
      const matchesType = selectedType === 'All' || subject.type === selectedType;
      const matchesSemester = selectedSemester === 'All' || subject.semester === selectedSemester;
      
      return matchesSearch && matchesDepartment && matchesType && matchesSemester;
    });
    setFilteredSubjects(filtered);
  }, [searchTerm, selectedDepartment, selectedType, selectedSemester, subjects]);

  const handleAddSubject = () => {
    const id = Math.max(...subjects.map(s => s.id)) + 1;
    const subject = {
      ...newSubject,
      id,
      credits: parseInt(newSubject.credits),
      students: 0,
      status: 'Active',
      prerequisites: newSubject.prerequisites.filter(p => p.trim() !== '')
    };
    setSubjects([...subjects, subject]);
    setNewSubject({
      code: '',
      name: '',
      semester: '',
      department: '',
      credits: '',
      type: '',
      faculty: '',
      description: '',
      prerequisites: []
    });
    setShowAddModal(false);
  };

  const handleEditSubject = () => {
    setSubjects(subjects.map(s => 
      s.id === selectedSubject.id ? { ...selectedSubject } : s
    ));
    setShowEditModal(false);
  };

  const handleDeleteSubject = () => {
    setSubjects(subjects.filter(s => s.id !== selectedSubject.id));
    setShowDeleteModal(false);
    setSelectedSubject(null);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Theory': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'Lab': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Project': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'Elective': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'Activity': return 'text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Inactive': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Subjects Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage academic subjects and course curriculum
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Subject
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <BookOpenIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subjects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CheckIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <AcademicCapIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Theory</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.theory}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <ClockIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lab</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lab}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <ChartBarIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.project}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <BookOpenIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalCredits}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <UserGroupIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search subjects, codes, or faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input min-w-40"
            >
              <option value="All">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input min-w-32"
            >
              <option value="All">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="input min-w-40"
            >
              <option value="All">All Semesters</option>
              {semesters.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Subject Code
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Faculty
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                      {subject.code}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs">
                      {subject.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {subject.semester}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {subject.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(subject.type)}`}>
                      {subject.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {subject.credits}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {subject.faculty}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {subject.students}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subject.status)}`}>
                      {subject.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedSubject(subject);
                          setShowViewModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSubject({ ...subject });
                          setShowEditModal(true);
                        }}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSubject(subject);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No subjects found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Subject</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    className="input"
                    placeholder="e.g., 22CSE51"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={newSubject.credits}
                    onChange={(e) => setNewSubject({ ...newSubject, credits: e.target.value })}
                    className="input"
                    placeholder="e.g., 3"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Software Engineering and Project Management"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={newSubject.department}
                    onChange={(e) => setNewSubject({ ...newSubject, department: e.target.value })}
                    className="input"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="General">General</option>
                    <option value="Physical Education">Physical Education</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={newSubject.type}
                    onChange={(e) => setNewSubject({ ...newSubject, type: e.target.value })}
                    className="input"
                  >
                    <option value="">Select Type</option>
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab</option>
                    <option value="Project">Project</option>
                    <option value="Elective">Elective</option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Semester
                  </label>
                  <select
                    value={newSubject.semester}
                    onChange={(e) => setNewSubject({ ...newSubject, semester: e.target.value })}
                    className="input"
                  >
                    <option value="">Select Semester</option>
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Faculty
                </label>
                <input
                  type="text"
                  value={newSubject.faculty}
                  onChange={(e) => setNewSubject({ ...newSubject, faculty: e.target.value })}
                  className="input"
                  placeholder="e.g., Dr. John Smith"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                  className="input min-h-20"
                  placeholder="Brief description of the subject..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSubject}
                  disabled={!newSubject.code || !newSubject.name || !newSubject.department}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Subject Modal */}
      {showViewModal && selectedSubject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subject Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Subject Code
                    </h3>
                    <p className="text-lg font-mono font-medium text-gray-900 dark:text-white">
                      {selectedSubject.code}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Credits
                    </h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedSubject.credits}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Subject Name
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedSubject.name}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Department
                    </h3>
                    <p className="text-gray-900 dark:text-white">{selectedSubject.department}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Type
                    </h3>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getTypeColor(selectedSubject.type)}`}>
                      {selectedSubject.type}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Semester
                    </h3>
                    <p className="text-gray-900 dark:text-white">{selectedSubject.semester}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Faculty
                    </h3>
                    <p className="text-gray-900 dark:text-white">{selectedSubject.faculty}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Students Enrolled
                    </h3>
                    <p className="text-gray-900 dark:text-white">{selectedSubject.students}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Status
                  </h3>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedSubject.status)}`}>
                    {selectedSubject.status}
                  </span>
                </div>
                
                {selectedSubject.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Description
                    </h3>
                    <p className="text-gray-900 dark:text-white leading-relaxed">
                      {selectedSubject.description}
                    </p>
                  </div>
                )}
                
                {selectedSubject.prerequisites && selectedSubject.prerequisites.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Prerequisites
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubject.prerequisites.map((prereq, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setShowEditModal(true);
                  }}
                  className="btn-primary"
                >
                  Edit Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {showEditModal && selectedSubject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Subject</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={selectedSubject.code}
                    onChange={(e) => setSelectedSubject({ ...selectedSubject, code: e.target.value })}
                    className="input"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={selectedSubject.credits}
                    onChange={(e) => setSelectedSubject({ ...selectedSubject, credits: parseInt(e.target.value) })}
                    className="input"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={selectedSubject.name}
                  onChange={(e) => setSelectedSubject({ ...selectedSubject, name: e.target.value })}
                  className="input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedSubject.department}
                    onChange={(e) => setSelectedSubject({ ...selectedSubject, department: e.target.value })}
                    className="input"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="General">General</option>
                    <option value="Physical Education">Physical Education</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={selectedSubject.type}
                    onChange={(e) => setSelectedSubject({ ...selectedSubject, type: e.target.value })}
                    className="input"
                  >
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab</option>
                    <option value="Project">Project</option>
                    <option value="Elective">Elective</option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Semester
                  </label>
                  <select
                    value={selectedSubject.semester}
                    onChange={(e) => setSelectedSubject({ ...selectedSubject, semester: e.target.value })}
                    className="input"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                    <option value="4th Semester">4th Semester</option>
                    <option value="5th Semester">5th Semester</option>
                    <option value="6th Semester">6th Semester</option>
                    <option value="7th Semester">7th Semester</option>
                    <option value="8th Semester">8th Semester</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Faculty
                </label>
                <input
                  type="text"
                  value={selectedSubject.faculty}
                  onChange={(e) => setSelectedSubject({ ...selectedSubject, faculty: e.target.value })}
                  className="input"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={selectedSubject.description}
                  onChange={(e) => setSelectedSubject({ ...selectedSubject, description: e.target.value })}
                  className="input min-h-20"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSubject}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedSubject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Subject</h2>
                  <p className="text-gray-600 dark:text-gray-300">This action cannot be undone.</p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete 
                <span className="font-semibold">{selectedSubject.name}</span> 
                ({selectedSubject.code})?
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubject}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Delete Subject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockSubjects;