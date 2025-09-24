import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { 
  DocumentTextIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon,
  StarIcon,
  CalculatorIcon,
  DocumentArrowDownIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const MockResults = () => {
  const { theme } = useTheme();
  
  // Mock students data
  const [students] = useState([
    { id: 'STU001', name: 'Arjun Sharma', email: 'arjun.sharma@gmail.com', semester: '5th Semester' },
    { id: 'STU002', name: 'Priya Patel', email: 'priya.patel@gmail.com', semester: '5th Semester' },
    { id: 'STU003', name: 'Rahul Kumar', email: 'rahul.kumar@gmail.com', semester: '5th Semester' },
    { id: 'STU004', name: 'Sneha Reddy', email: 'sneha.reddy@gmail.com', semester: '5th Semester' },
    { id: 'STU005', name: 'Vikash Singh', email: 'vikash.singh@gmail.com', semester: '5th Semester' },
    { id: 'STU006', name: 'Anita Joshi', email: 'anita.joshi@gmail.com', semester: '5th Semester' },
    { id: 'STU007', name: 'Deepak Gupta', email: 'deepak.gupta@gmail.com', semester: '5th Semester' },
    { id: 'STU008', name: 'Kavya Nair', email: 'kavya.nair@gmail.com', semester: '5th Semester' }
  ]);

  // Engineering subjects from syllabus
  const [subjects] = useState([
    { code: '22CSE51', name: 'Software Engineering and Project Management', credits: 4, maxMarks: 100 },
    { code: '22CSE52', name: 'Design and Analysis of Algorithms', credits: 3, maxMarks: 100 },
    { code: '22CSL52', name: 'Design and Analysis of Algorithms Lab', credits: 1, maxMarks: 100 },
    { code: '22CSE53', name: 'Database Management Systems', credits: 3, maxMarks: 100 },
    { code: '22CSL53', name: 'Database Management Systems Lab', credits: 1, maxMarks: 100 },
    { code: '22CSE54X', name: 'Professional Elective Course-I', credits: 3, maxMarks: 100 },
    { code: '22RMK55', name: 'Research Methodology and IPR', credits: 2, maxMarks: 100 },
    { code: '22SDK56', name: 'Critical and Creative Thinking Skills', credits: 2, maxMarks: 100 },
    { code: '22ESK57', name: 'Environmental Studies', credits: 1, maxMarks: 100 },
    { code: '22CSE58', name: 'Mini Project-II', credits: 2, maxMarks: 100 },
    { code: '22NSS50', name: 'National Service Scheme (NSS)', credits: 0, maxMarks: 100 },
    { code: '22PED50', name: 'Physical Education (PE)', credits: 1, maxMarks: 100 },
    { code: '22YOG50', name: 'Yoga', credits: 1, maxMarks: 100 }
  ]);

  // Sample results data
  const [results, setResults] = useState([
    { id: 1, studentId: 'STU001', studentName: 'Arjun Sharma', subjectCode: '22CSE51', subjectName: 'Software Engineering and Project Management', marks: 85, maxMarks: 100, grade: 'A', semester: '5th Semester', examType: 'Final', examDate: '2024-12-15' },
    { id: 2, studentId: 'STU001', studentName: 'Arjun Sharma', subjectCode: '22CSE52', subjectName: 'Design and Analysis of Algorithms', marks: 92, maxMarks: 100, grade: 'A+', semester: '5th Semester', examType: 'Final', examDate: '2024-12-16' },
    { id: 3, studentId: 'STU001', studentName: 'Arjun Sharma', subjectCode: '22CSL52', subjectName: 'Design and Analysis of Algorithms Lab', marks: 88, maxMarks: 100, grade: 'A', semester: '5th Semester', examType: 'Practical', examDate: '2024-12-17' },
    { id: 4, studentId: 'STU002', studentName: 'Priya Patel', subjectCode: '22CSE51', subjectName: 'Software Engineering and Project Management', marks: 78, maxMarks: 100, grade: 'B+', semester: '5th Semester', examType: 'Final', examDate: '2024-12-15' },
    { id: 5, studentId: 'STU002', studentName: 'Priya Patel', subjectCode: '22CSE52', subjectName: 'Design and Analysis of Algorithms', marks: 95, maxMarks: 100, grade: 'A+', semester: '5th Semester', examType: 'Final', examDate: '2024-12-16' },
    { id: 6, studentId: 'STU003', studentName: 'Rahul Kumar', subjectCode: '22CSE53', subjectName: 'Database Management Systems', marks: 82, maxMarks: 100, grade: 'A', semester: '5th Semester', examType: 'Final', examDate: '2024-12-18' },
    { id: 7, studentId: 'STU003', studentName: 'Rahul Kumar', subjectCode: '22CSL53', subjectName: 'Database Management Systems Lab', marks: 90, maxMarks: 100, grade: 'A+', semester: '5th Semester', examType: 'Practical', examDate: '2024-12-19' },
    { id: 8, studentId: 'STU004', studentName: 'Sneha Reddy', subjectCode: '22CSE54X', subjectName: 'Professional Elective Course-I', marks: 87, maxMarks: 100, grade: 'A', semester: '5th Semester', examType: 'Final', examDate: '2024-12-20' },
    { id: 9, studentId: 'STU005', studentName: 'Vikash Singh', subjectCode: '22RMK55', subjectName: 'Research Methodology and IPR', marks: 75, maxMarks: 100, grade: 'B+', semester: '5th Semester', examType: 'Final', examDate: '2024-12-21' },
    { id: 10, studentId: 'STU006', studentName: 'Anita Joshi', subjectCode: '22SDK56', subjectName: 'Critical and Creative Thinking Skills', marks: 93, maxMarks: 100, grade: 'A+', semester: '5th Semester', examType: 'Final', examDate: '2024-12-22' },
    { id: 11, studentId: 'STU007', studentName: 'Deepak Gupta', subjectCode: '22ESK57', subjectName: 'Environmental Studies', marks: 80, maxMarks: 100, grade: 'B+', semester: '5th Semester', examType: 'Final', examDate: '2024-12-23' },
    { id: 12, studentId: 'STU008', studentName: 'Kavya Nair', subjectCode: '22CSE58', subjectName: 'Mini Project-II', marks: 96, maxMarks: 100, grade: 'A+', semester: '5th Semester', examType: 'Project', examDate: '2024-12-24' }
  ]);

  const [filteredResults, setFilteredResults] = useState(results);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedExamType, setSelectedExamType] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [newResult, setNewResult] = useState({
    studentId: '',
    subjectCode: '',
    marks: '',
    examType: 'Final',
    examDate: ''
  });

  // Get unique values for filters
  const studentNames = [...new Set(results.map(result => result.studentName))];
  const subjectNames = [...new Set(results.map(result => result.subjectName))];
  const grades = [...new Set(results.map(result => result.grade))];
  const examTypes = [...new Set(results.map(result => result.examType))];

  // Calculate statistics
  const stats = {
    totalResults: results.length,
    totalStudents: [...new Set(results.map(r => r.studentId))].length,
    avgMarks: Math.round(results.reduce((sum, r) => sum + r.marks, 0) / results.length),
    highestMarks: Math.max(...results.map(r => r.marks)),
    lowestMarks: Math.min(...results.map(r => r.marks)),
    passPercentage: Math.round((results.filter(r => r.marks >= 40).length / results.length) * 100),
    excellentGrades: results.filter(r => r.grade === 'A+').length
  };

  // Helper function to calculate percentage
  const calculatePercentage = (marks, maxMarks) => {
    return Math.round((marks / maxMarks) * 100);
  };

  // Helper function to get grade color
  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'A': return 'text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'B+': return 'text-indigo-700 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/30';
      case 'B': return 'text-purple-700 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'C+': return 'text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'C': return 'text-orange-700 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'D': return 'text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'F': return 'text-red-800 bg-red-200 dark:text-red-300 dark:bg-red-900/50';
      default: return 'text-gray-700 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  // Helper function to get exam type color
  const getExamTypeColor = (type) => {
    switch (type) {
      case 'Final': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      case 'Midterm': return 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30';
      case 'Practical': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Project': return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
      case 'Assignment': return 'text-teal-600 bg-teal-100 dark:text-teal-400 dark:bg-teal-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  // Filter and sort results
  useEffect(() => {
    let filtered = results.filter(result => {
      const matchesSearch = result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           result.subjectCode.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStudent = selectedStudent === 'All' || result.studentName === selectedStudent;
      const matchesSubject = selectedSubject === 'All' || result.subjectName === selectedSubject;
      const matchesGrade = selectedGrade === 'All' || result.grade === selectedGrade;
      const matchesExamType = selectedExamType === 'All' || result.examType === selectedExamType;
      
      return matchesSearch && matchesStudent && matchesSubject && matchesGrade && matchesExamType;
    });

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];
        
        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    setFilteredResults(filtered);
  }, [searchTerm, selectedStudent, selectedSubject, selectedGrade, selectedExamType, results, sortField, sortDirection]);

  const handleAddResult = () => {
    const student = students.find(s => s.id === newResult.studentId);
    const subject = subjects.find(s => s.code === newResult.subjectCode);
    
    if (!student || !subject) return;
    
    const marks = parseInt(newResult.marks);
    const percentage = calculatePercentage(marks, subject.maxMarks);
    let grade = 'F';
    
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 35) grade = 'D';
    
    const result = {
      id: Math.max(...results.map(r => r.id)) + 1,
      studentId: newResult.studentId,
      studentName: student.name,
      subjectCode: newResult.subjectCode,
      subjectName: subject.name,
      marks: marks,
      maxMarks: subject.maxMarks,
      grade: grade,
      semester: '5th Semester',
      examType: newResult.examType,
      examDate: newResult.examDate
    };
    
    setResults([...results, result]);
    setNewResult({
      studentId: '',
      subjectCode: '',
      marks: '',
      examType: 'Final',
      examDate: ''
    });
    setShowAddModal(false);
  };

  const handleEditResult = () => {
    const marks = parseInt(selectedResult.marks);
    const subject = subjects.find(s => s.code === selectedResult.subjectCode);
    const percentage = calculatePercentage(marks, subject.maxMarks);
    let grade = 'F';
    
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B+';
    else if (percentage >= 60) grade = 'B';
    else if (percentage >= 50) grade = 'C+';
    else if (percentage >= 40) grade = 'C';
    else if (percentage >= 35) grade = 'D';
    
    const updatedResult = { ...selectedResult, grade };
    setResults(results.map(r => r.id === selectedResult.id ? updatedResult : r));
    setShowEditModal(false);
  };

  const handleDeleteResult = () => {
    setResults(results.filter(r => r.id !== selectedResult.id));
    setShowDeleteModal(false);
    setSelectedResult(null);
  };

  const handleExportResults = () => {
    // Prepare CSV data
    const headers = [
      'Student Name',
      'Student ID', 
      'Subject Name',
      'Subject Code',
      'Marks Obtained',
      'Total Marks',
      'Percentage',
      'Grade',
      'Exam Type',
      'Exam Date',
      'Semester'
    ];
    
    const csvData = filteredResults.map(result => [
      result.studentName,
      result.studentId,
      result.subjectName,
      result.subjectCode,
      result.marks,
      result.maxMarks,
      calculatePercentage(result.marks, result.maxMarks) + '%',
      result.grade,
      result.examType,
      new Date(result.examDate).toLocaleDateString(),
      result.semester
    ]);
    
    // Create CSV content
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `results_export_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Results Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage student examination results and academic performance
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Add Result
          </button>
          <button 
            onClick={handleExportResults}
            className="btn-secondary flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            Export Results
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <DocumentTextIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Results</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalResults}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <UserGroupIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CalculatorIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Marks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.avgMarks}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <TrophyIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.highestMarks}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <ChartBarIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lowest</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lowestMarks}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-green-500 text-white">
              <CheckIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.passPercentage}%</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <StarIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">A+ Grades</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.excellentGrades}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by student name, subject, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="input"
            >
              <option value="All">All Students</option>
              {studentNames.map(student => (
                <option key={student} value={student}>{student}</option>
              ))}
            </select>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="input"
            >
              <option value="All">All Subjects</option>
              {subjectNames.map(subject => (
                <option key={subject} value={subject}>{subject.length > 30 ? subject.substring(0, 30) + '...' : subject}</option>
              ))}
            </select>
            
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="input"
            >
              <option value="All">All Grades</option>
              {grades.sort().map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="input"
            >
              <option value="All">All Exam Types</option>
              {examTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort('studentName')}
                >
                  <div className="flex items-center gap-2">
                    Student
                    {sortField === 'studentName' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Student ID
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort('subjectName')}
                >
                  <div className="flex items-center gap-2">
                    Subject
                    {sortField === 'subjectName' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort('marks')}
                >
                  <div className="flex items-center gap-2">
                    Marks
                    {sortField === 'marks' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Percentage
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort('grade')}
                >
                  <div className="flex items-center gap-2">
                    Grade
                    {sortField === 'grade' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Exam Type
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => handleSort('examDate')}
                >
                  <div className="flex items-center gap-2">
                    Exam Date
                    {sortField === 'examDate' && (
                      sortDirection === 'asc' ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.studentName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                      {result.studentId}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white max-w-xs">
                      {result.subjectName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {result.subjectCode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {result.marks}/{result.maxMarks}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {calculatePercentage(result.marks, result.maxMarks)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-sm font-bold rounded-full ${getGradeColor(result.grade)}`}>
                      {result.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getExamTypeColor(result.examType)}`}>
                      {result.examType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(result.examDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedResult(result);
                          setShowViewModal(true);
                        }}
                        className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedResult({ ...result });
                          setShowEditModal(true);
                        }}
                        className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-all"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedResult(result);
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
        
        {filteredResults.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No results found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add Result Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Result</h2>
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
                    Student
                  </label>
                  <select
                    value={newResult.studentId}
                    onChange={(e) => setNewResult({ ...newResult, studentId: e.target.value })}
                    className="input"
                  >
                    <option value="">Select Student</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name} ({student.id})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    value={newResult.subjectCode}
                    onChange={(e) => setNewResult({ ...newResult, subjectCode: e.target.value })}
                    className="input"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject.code} value={subject.code}>
                        {subject.code} - {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Marks Obtained
                  </label>
                  <input
                    type="number"
                    value={newResult.marks}
                    onChange={(e) => setNewResult({ ...newResult, marks: e.target.value })}
                    className="input"
                    placeholder="Enter marks"
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Exam Type
                  </label>
                  <select
                    value={newResult.examType}
                    onChange={(e) => setNewResult({ ...newResult, examType: e.target.value })}
                    className="input"
                  >
                    <option value="Final">Final Exam</option>
                    <option value="Midterm">Midterm Exam</option>
                    <option value="Practical">Practical Exam</option>
                    <option value="Project">Project Evaluation</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={newResult.examDate}
                    onChange={(e) => setNewResult({ ...newResult, examDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              
              {newResult.marks && newResult.subjectCode && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p>Percentage: <span className="font-semibold">{calculatePercentage(parseInt(newResult.marks) || 0, 100)}%</span></p>
                    <p>Grade: <span className={`font-semibold px-2 py-1 rounded text-xs ${
                      (() => {
                        const percentage = calculatePercentage(parseInt(newResult.marks) || 0, 100);
                        if (percentage >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
                        else if (percentage >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
                        else if (percentage >= 70) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
                        else if (percentage >= 60) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
                        else if (percentage >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
                        else if (percentage >= 40) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
                        else if (percentage >= 35) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
                        else return 'bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-300';
                      })()
                    }`}>
                      {(() => {
                        const percentage = calculatePercentage(parseInt(newResult.marks) || 0, 100);
                        if (percentage >= 90) return 'A+';
                        else if (percentage >= 80) return 'A';
                        else if (percentage >= 70) return 'B+';
                        else if (percentage >= 60) return 'B';
                        else if (percentage >= 50) return 'C+';
                        else if (percentage >= 40) return 'C';
                        else if (percentage >= 35) return 'D';
                        else return 'F';
                      })()
                    }</span></p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddResult}
                  disabled={!newResult.studentId || !newResult.subjectCode || !newResult.marks || !newResult.examDate}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Result Modal */}
      {showViewModal && selectedResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Result Details</h2>
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
                      Student Information
                    </h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedResult.studentName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ID: {selectedResult.studentId}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Subject Information
                    </h3>
                    <p className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedResult.subjectName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Code: {selectedResult.subjectCode}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Marks Obtained
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedResult.marks}/{selectedResult.maxMarks}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Percentage
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {calculatePercentage(selectedResult.marks, selectedResult.maxMarks)}%
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Grade
                    </h3>
                    <span className={`inline-flex px-4 py-2 text-lg font-bold rounded-full ${getGradeColor(selectedResult.grade)}`}>
                      {selectedResult.grade}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Exam Type
                    </h3>
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getExamTypeColor(selectedResult.examType)}`}>
                      {selectedResult.examType}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Exam Date
                    </h3>
                    <p className="text-gray-900 dark:text-white">{new Date(selectedResult.examDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Semester
                    </h3>
                    <p className="text-gray-900 dark:text-white">{selectedResult.semester}</p>
                  </div>
                </div>
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
                  Edit Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Result Modal */}
      {showEditModal && selectedResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Result</h2>
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
                    Student
                  </label>
                  <input
                    type="text"
                    value={`${selectedResult.studentName} (${selectedResult.studentId})`}
                    className="input"
                    disabled
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={`${selectedResult.subjectCode} - ${selectedResult.subjectName}`}
                    className="input"
                    disabled
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Marks Obtained
                  </label>
                  <input
                    type="number"
                    value={selectedResult.marks}
                    onChange={(e) => setSelectedResult({ ...selectedResult, marks: parseInt(e.target.value) || 0 })}
                    className="input"
                    min="0"
                    max="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Exam Type
                  </label>
                  <select
                    value={selectedResult.examType}
                    onChange={(e) => setSelectedResult({ ...selectedResult, examType: e.target.value })}
                    className="input"
                  >
                    <option value="Final">Final Exam</option>
                    <option value="Midterm">Midterm Exam</option>
                    <option value="Practical">Practical Exam</option>
                    <option value="Project">Project Evaluation</option>
                    <option value="Assignment">Assignment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={selectedResult.examDate}
                    onChange={(e) => setSelectedResult({ ...selectedResult, examDate: e.target.value })}
                    className="input"
                  />
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Updated Preview</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Percentage: <span className="font-semibold">{calculatePercentage(selectedResult.marks, selectedResult.maxMarks)}%</span></p>
                  <p>New Grade: <span className={`font-semibold px-2 py-1 rounded text-xs ${
                    (() => {
                      const percentage = calculatePercentage(selectedResult.marks, selectedResult.maxMarks);
                      if (percentage >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
                      else if (percentage >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
                      else if (percentage >= 70) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
                      else if (percentage >= 60) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
                      else if (percentage >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
                      else if (percentage >= 40) return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
                      else if (percentage >= 35) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
                      else return 'bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-300';
                    })()
                  }`}>
                    {(() => {
                      const percentage = calculatePercentage(selectedResult.marks, selectedResult.maxMarks);
                      if (percentage >= 90) return 'A+';
                      else if (percentage >= 80) return 'A';
                      else if (percentage >= 70) return 'B+';
                      else if (percentage >= 60) return 'B';
                      else if (percentage >= 50) return 'C+';
                      else if (percentage >= 40) return 'C';
                      else if (percentage >= 35) return 'D';
                      else return 'F';
                    })()
                  }</span></p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditResult}
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
      {showDeleteModal && selectedResult && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Delete Result</h2>
                  <p className="text-gray-600 dark:text-gray-300">This action cannot be undone.</p>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete the result for 
                <span className="font-semibold">{selectedResult.studentName}</span> 
                in <span className="font-semibold">{selectedResult.subjectName}</span>?
              </p>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteResult}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Delete Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockResults;