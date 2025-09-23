import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  User,
  Settings,
  GraduationCap
} from 'lucide-react'
import { clsx } from 'clsx'

const Sidebar = () => {
  const { user } = useAuth()

  const getNavItems = () => {
    const items = [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        roles: ['admin', 'teacher', 'student']
      },
      {
        name: 'Profile',
        href: '/profile',
        icon: User,
        roles: ['admin', 'teacher', 'student']
      }
    ]

    // Admin and Teacher specific items
    if (user?.role === 'admin' || user?.role === 'teacher') {
      items.push(
        {
          name: 'Students',
          href: '/students',
          icon: Users,
          roles: ['admin', 'teacher']
        },
        {
          name: 'Subjects',
          href: '/subjects',
          icon: BookOpen,
          roles: ['admin', 'teacher']
        },
        {
          name: 'Results',
          href: '/results',
          icon: FileText,
          roles: ['admin', 'teacher']
        }
      )
    }

    // Student specific items
    if (user?.role === 'student') {
      items.push({
        name: 'My Results',
        href: '/my-results',
        icon: GraduationCap,
        roles: ['student']
      })
    }

    // Admin specific items
    if (user?.role === 'admin') {
      items.push(
        {
          name: 'Analytics',
          href: '/analytics',
          icon: BarChart3,
          roles: ['admin']
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: Settings,
          roles: ['admin']
        }
      )
    }

    return items.filter(item => item.roles.includes(user?.role))
  }

  const navItems = getNavItems()

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">SRMS</span>
        </div>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )
                }
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            )
          })}
        </div>
      </nav>
      
      {/* User info at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user?.student_profile?.first_name || user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
