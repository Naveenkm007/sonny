import { useAuth } from '../../contexts/MockAuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Bell, User, LogOut, Search, Menu, Globe, Sun, Moon, Monitor } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme, isDark } = useTheme()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="h-5 w-5" />
    if (theme === 'system') return <Monitor className="h-5 w-5" />
    return <Sun className="h-5 w-5" />
  }

  const getThemeColors = () => {
    if (theme === 'dark') return 'text-gray-400 group-hover:text-blue-400'
    if (theme === 'system') return 'text-gray-600 group-hover:text-purple-500'
    return 'text-gray-600 group-hover:text-yellow-500'
  }

  const notifications = [
    { id: 1, title: 'New student registered', time: '2 min ago', type: 'info' },
    { id: 2, title: 'Results published for Class 10A', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'System maintenance scheduled', time: '2 hours ago', type: 'warning' },
  ]

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 sticky top-0 z-40 dark:bg-gray-900/80 dark:border-gray-700/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent">
              Student Result Management System
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Welcome back, manage your academic data efficiently</p>
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search students, results..."
              className="w-64 pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:text-gray-100 transition-all duration-200"
            />
          </div>
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title={`Current theme: ${theme}`}
          >
            <div className={`transition-colors ${getThemeColors()}`}>
              {getThemeIcon()}
            </div>
          </button>
          
          {/* Language */}
          <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors group">
            <Globe className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
          </button>
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-danger-500 to-danger-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm animate-pulse">
                3
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-hard border border-gray-200/50 animate-slide-down">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{notifications.length} new</span>
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === 'success' ? 'bg-success-500' :
                          notification.type === 'warning' ? 'bg-warning-500' :
                          'bg-info-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t border-gray-100">
                  <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2 hover:bg-primary-50 rounded-lg transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-colored group-hover:shadow-lg transition-all duration-200">
                {user?.firstName?.[0] || 'A'}{user?.lastName?.[0] || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-hard border border-gray-200/50 animate-slide-down">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-colored">
                      {user?.firstName?.[0] || 'A'}{user?.lastName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                      <p className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full mt-1">{user?.role}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                  
                  <button className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                    <Sun className="h-4 w-4" />
                    <span>Appearance</span>
                  </button>
                  
                  <hr className="my-2 border-gray-100" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-danger-600 hover:bg-danger-50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
