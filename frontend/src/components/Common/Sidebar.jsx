import { useAuth } from '../../contexts/MockAuthContext'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  User,
  Settings,
  GraduationCap,
  ChevronRight,
  Sparkles
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
        roles: ['admin', 'teacher', 'student'],
        gradient: 'from-blue-500 to-blue-600'
      },
      {
        name: 'Profile',
        href: '/profile',
        icon: User,
        roles: ['admin', 'teacher', 'student'],
        gradient: 'from-purple-500 to-purple-600'
      }
    ]

    // Admin and Teacher specific items
    if (user?.role === 'admin' || user?.role === 'teacher') {
      items.push(
        {
          name: 'Students',
          href: '/students',
          icon: Users,
          roles: ['admin', 'teacher'],
          gradient: 'from-green-500 to-green-600'
        },
        {
          name: 'Subjects',
          href: '/subjects',
          icon: BookOpen,
          roles: ['admin', 'teacher'],
          gradient: 'from-orange-500 to-orange-600'
        },
        {
          name: 'Results',
          href: '/results',
          icon: FileText,
          roles: ['admin', 'teacher'],
          gradient: 'from-teal-500 to-teal-600'
        }
      )
    }

    // Student specific items
    if (user?.role === 'student') {
      items.push({
        name: 'My Results',
        href: '/my-results',
        icon: GraduationCap,
        roles: ['student'],
        gradient: 'from-emerald-500 to-emerald-600'
      })
    }

    // Admin specific items
    if (user?.role === 'admin') {
      items.push(
        {
          name: 'Analytics',
          href: '/analytics',
          icon: BarChart3,
          roles: ['admin'],
          gradient: 'from-pink-500 to-pink-600'
        },
        {
          name: 'Settings',
          href: '/settings',
          icon: Settings,
          roles: ['admin'],
          gradient: 'from-gray-500 to-gray-600'
        }
      )
    }

    return items.filter(item => item.roles.includes(user?.role))
  }

  const navItems = getNavItems()

  return (
    <div className="w-72 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200/50 dark:border-gray-600/50 min-h-screen flex flex-col shadow-soft transition-all duration-300">
      {/* Header */}
      <div className="p-6 flex-shrink-0 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-colored">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-2.5 w-2.5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              SRMS
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-300 font-medium">Student Result Management</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  clsx(
                    'nav-item group relative',
                    isActive
                      ? 'nav-item-active'
                      : 'nav-item-inactive'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={clsx(
                      'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200',
                      isActive 
                        ? 'bg-white/20 shadow-sm dark:bg-white/10' 
                        : `bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-60 dark:opacity-60 dark:group-hover:opacity-80`
                    )}>
                      <Icon className={clsx(
                        'h-5 w-5 transition-all duration-200',
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-700 group-hover:text-gray-900 dark:text-white dark:group-hover:text-white'
                      )} />
                    </div>
                    <span className={clsx(
                      'ml-3 font-medium transition-all duration-200',
                      isActive ? 'text-white' : 'text-gray-700 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-white'
                    )}>
                      {item.name}
                    </span>
                    <ChevronRight className={clsx(
                      'ml-auto h-4 w-4 transition-all duration-200',
                      isActive ? 'text-white/70 translate-x-1' : 'text-gray-400 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-white group-hover:translate-x-0.5'
                    )} />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-sm" />
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
      
      {/* User Profile Section */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200/50 dark:border-gray-600/50">
        <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-750 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-600/30 shadow-soft">
          <div className="flex items-center space-x-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-colored">
                {user?.firstName?.[0] || 'A'}{user?.lastName?.[0] || 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-success-400 to-success-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {user?.student_profile?.first_name 
                  ? `${user.student_profile.first_name} ${user.student_profile.last_name}` 
                  : user?.firstName && user?.lastName 
                  ? `${user.firstName} ${user.lastName}`
                  : 'Admin User'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-medium">
                {user?.position || (user?.role === 'admin' ? 'System Administrator' : user?.role)}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                <span className="text-xs text-success-600 dark:text-success-400 ml-1 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar