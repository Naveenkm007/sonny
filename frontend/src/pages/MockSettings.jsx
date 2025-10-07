import { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Globe, 
  Database,
  Users,
  Key,
  Mail,
  Clock,
  Save
} from 'lucide-react'

const MockSettings = () => {
  const [settings, setSettings] = useState({
    // System Settings
    systemName: 'Student Result Management System',
    academicYear: '2024-2025',
    defaultGradingSystem: 'percentage',
    
    // Security Settings
    sessionTimeout: '30',
    passwordComplexity: 'medium',
    twoFactorAuth: false,
    
    // Notification Settings
    emailNotifications: true,
    resultPublishNotification: true,
    systemMaintenanceAlerts: true,
    
    // Display Settings
    theme: 'light',
    language: 'english',
    dateFormat: 'DD/MM/YYYY',
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: '30'
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = () => {
    // Mock save functionality
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="mr-3 h-7 w-7 text-primary-600" />
            System Settings
          </h1>
          <p className="text-gray-600">Configure your SRMS system preferences and security settings</p>
        </div>
        <button 
          onClick={saveSettings}
          className="btn-primary flex items-center"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* System Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Database className="mr-2 h-5 w-5 text-blue-600" />
            System Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                System Name
              </label>
              <input
                type="text"
                value={settings.systemName}
                onChange={(e) => handleSettingChange('systemName', e.target.value)}
                className="input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Academic Year
              </label>
              <select
                value={settings.academicYear}
                onChange={(e) => handleSettingChange('academicYear', e.target.value)}
                className="input"
              >
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2023-2024">2023-2024</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Grading System
              </label>
              <select
                value={settings.defaultGradingSystem}
                onChange={(e) => handleSettingChange('defaultGradingSystem', e.target.value)}
                className="input"
              >
                <option value="percentage">Percentage (0-100)</option>
                <option value="gpa">GPA (0-10)</option>
                <option value="letter">Letter Grades (A-F)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-red-600" />
            Security Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (minutes)
              </label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                className="input"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Complexity
              </label>
              <select
                value={settings.passwordComplexity}
                onChange={(e) => handleSettingChange('passwordComplexity', e.target.value)}
                className="input"
              >
                <option value="low">Low (6+ characters)</option>
                <option value="medium">Medium (8+ chars, mixed case)</option>
                <option value="high">High (12+ chars, symbols)</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="twoFactorAuth" className="text-sm text-gray-700">
                Enable Two-Factor Authentication
              </label>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bell className="mr-2 h-5 w-5 text-yellow-600" />
            Notification Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="emailNotifications" className="text-sm text-gray-700">
                Email Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="resultPublishNotification"
                checked={settings.resultPublishNotification}
                onChange={(e) => handleSettingChange('resultPublishNotification', e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="resultPublishNotification" className="text-sm text-gray-700">
                Result Publication Alerts
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="systemMaintenanceAlerts"
                checked={settings.systemMaintenanceAlerts}
                onChange={(e) => handleSettingChange('systemMaintenanceAlerts', e.target.checked)}
                className="mr-3"
              />
              <label htmlFor="systemMaintenanceAlerts" className="text-sm text-gray-700">
                System Maintenance Alerts
              </label>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="mr-2 h-5 w-5 text-green-600" />
            Display Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => handleSettingChange('theme', e.target.value)}
                className="input"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="input"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                className="input"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-purple-600" />
          Backup & Maintenance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoBackup"
              checked={settings.autoBackup}
              onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
              className="mr-3"
            />
            <label htmlFor="autoBackup" className="text-sm text-gray-700">
              Enable Auto Backup
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
              className="input"
              disabled={!settings.autoBackup}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retention Period (days)
            </label>
            <select
              value={settings.retentionDays}
              onChange={(e) => handleSettingChange('retentionDays', e.target.value)}
              className="input"
            >
              <option value="7">7 days</option>
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Version:</span>
            <span className="ml-2 text-gray-900">SRMS v1.0.0</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Last Updated:</span>
            <span className="ml-2 text-gray-900">Oct 7, 2025</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Database:</span>
            <span className="ml-2 text-gray-900">SQLite (Active)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockSettings
