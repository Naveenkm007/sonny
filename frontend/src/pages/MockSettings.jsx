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
  Save,
  Server,
  FileText,
  BarChart3,
  Monitor,
  Wifi,
  HardDrive,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Upload,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react'

const MockSettings = () => {
  const [activeTab, setActiveTab] = useState('system')
  const [systemStatus, setSystemStatus] = useState({
    cpu: 45,
    memory: 62,
    storage: 78,
    network: 'connected'
  })
  const [settings, setSettings] = useState({
    // System Configuration
    systemName: 'Student Result Management System',
    academicYear: '2024-2025',
    semester: 'Fall 2024',
    defaultGradingSystem: 'percentage',
    maximumGrade: '100',
    passingGrade: '60',
    
    // Security Configuration
    sessionTimeout: '30',
    passwordComplexity: 'medium',
    twoFactorAuth: false,
    adminApprovalRequired: true,
    ipWhitelist: false,
    
    // Notification Settings
    emailNotifications: true,
    resultPublishNotification: true,
    systemMaintenanceAlerts: true,
    studentRegistrationAlerts: true,
    teacherActivityAlerts: false,
    
    // System Status
    serverStatus: 'online',
    databaseConnected: true,
    lastBackup: '2025-01-07 14:30:00',
    
    // Advanced Settings
    enableAPI: true,
    debugMode: false,
    maintenanceMode: false,
    systemLogs: true
  })

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = () => {
    alert('System settings saved successfully!')
  }

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive
          ? 'bg-primary-100 text-primary-700 border border-primary-200'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </button>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <SettingsIcon className="mr-3 h-7 w-7 text-primary-600" />
              System Administration
            </h1>
            <p className="text-gray-600">Configure system-wide settings, security, and preferences</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-600">System Online</span>
            </div>
            <button 
              onClick={saveSettings}
              className="btn-primary flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <TabButton
            id="system"
            label="System Config"
            icon={Server}
            isActive={activeTab === 'system'}
            onClick={setActiveTab}
          />
          <TabButton
            id="security"
            label="Security"
            icon={Shield}
            isActive={activeTab === 'security'}
            onClick={setActiveTab}
          />
          <TabButton
            id="notifications"
            label="Notifications"
            icon={Bell}
            isActive={activeTab === 'notifications'}
            onClick={setActiveTab}
          />
          <TabButton
            id="monitoring"
            label="System Monitor"
            icon={Monitor}
            isActive={activeTab === 'monitoring'}
            onClick={setActiveTab}
          />
          <TabButton
            id="backup"
            label="Backup & Data"
            icon={Database}
            isActive={activeTab === 'backup'}
            onClick={setActiveTab}
          />
        </div>

        {/* System Configuration Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Server className="mr-2 h-5 w-5 text-blue-600" />
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
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year
                    </label>
                    <select
                      value={settings.academicYear}
                      onChange={(e) => handleSettingChange('academicYear', e.target.value)}
                      className="input w-full"
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-red-600" />
                  Security Configuration
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Monitor Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CPU Usage</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStatus.cpu}%</p>
                  </div>
                  <Monitor className="h-8 w-8 text-blue-500" />
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${systemStatus.cpu}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Memory</p>
                    <p className="text-2xl font-bold text-gray-900">{systemStatus.memory}%</p>
                  </div>
                  <HardDrive className="h-8 w-8 text-green-500" />
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${systemStatus.memory}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab !== 'system' && activeTab !== 'monitoring' && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <SettingsIcon className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings
            </h3>
            <p className="text-gray-600">
              Configure {activeTab} settings for your SRMS system.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MockSettings
          
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
