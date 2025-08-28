import React, { useState } from 'react'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { logSecurityEvent, getClientIP, generateSessionId } from '../lib/supabase'

const AdminLogin = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
    setError('') // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Get client information for logging
    const clientIP = await getClientIP()
    const sessionId = generateSessionId()

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Hardcoded admin credentials (as specified in requirements)
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'codequest2025admin'

    const isSuccess = credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD

    // Log the login attempt
    await logSecurityEvent({
      event_type: isSuccess ? 'admin_login' : 'admin_login_failed',
      user_identifier: credentials.username,
      ip_address: clientIP,
      event_details: {
        attempted_username: credentials.username,
        timestamp: new Date().toISOString(),
        browser_info: typeof window !== 'undefined' ? {
          language: navigator.language,
          platform: navigator.platform,
          screen: `${screen.width}x${screen.height}`
        } : null
      },
      success: isSuccess,
      session_id: sessionId,
      risk_level: isSuccess ? 'low' : 'medium'
    })

    if (isSuccess) {
      // Store admin session
      sessionStorage.setItem('isAdmin', 'true')
      sessionStorage.setItem('adminLoginTime', new Date().toISOString())
      sessionStorage.setItem('adminSessionId', sessionId)
      
      // Log successful session creation
      await logSecurityEvent({
        event_type: 'admin_login',
        user_identifier: credentials.username,
        ip_address: clientIP,
        event_details: {
          action: 'session_created',
          session_id: sessionId
        },
        success: true,
        session_id: sessionId,
        risk_level: 'low'
      })
      
      if (onLoginSuccess) {
        onLoginSuccess()
      }
    } else {
      // Log failed attempt with additional security info
      await logSecurityEvent({
        event_type: 'admin_login_failed',
        user_identifier: credentials.username || 'unknown',
        ip_address: clientIP,
        event_details: {
          attempted_username: credentials.username,
          attempted_password_length: credentials.password.length,
          failure_reason: !credentials.username ? 'empty_username' : 
                         !credentials.password ? 'empty_password' : 'invalid_credentials',
          consecutive_failures: parseInt(localStorage.getItem('loginFailures') || '0') + 1
        },
        success: false,
        session_id: sessionId,
        risk_level: 'medium'
      })

      // Track consecutive failures
      const failures = parseInt(localStorage.getItem('loginFailures') || '0') + 1
      localStorage.setItem('loginFailures', failures.toString())

      if (failures >= 5) {
        // Log high-risk event for multiple failures
        await logSecurityEvent({
          event_type: 'suspicious_activity',
          user_identifier: credentials.username || 'unknown',
          ip_address: clientIP,
          event_details: {
            activity_type: 'multiple_failed_logins',
            failure_count: failures,
            time_window: '24h'
          },
          success: false,
          session_id: sessionId,
          risk_level: 'high'
        })
      }

      setError('Invalid credentials. Access denied.')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-gradient-to-br from-red-900/20 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Shield className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              ADMIN ACCESS
            </h1>
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-gray-400">
            Restricted Area - Authorized Personnel Only
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-red-400 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Enter admin username"
                className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-red-400 font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="Enter admin password"
                  className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-500/30 text-red-300 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !credentials.username || !credentials.password}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Access System</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-black/30 border border-gray-700 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              🔒 This system is protected by advanced security protocols.
              <br />
              All access attempts are logged and monitored.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            CodeQuest Admin Panel v2.0 | IEEE UCSC
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
