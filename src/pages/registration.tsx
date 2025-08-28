import React, { useState, useEffect } from 'react'
import CTFChallenge from '../components/CTFChallenge'
import TeamRegistration from '../components/TeamRegistration'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'
import EasterEggModal from '../components/EasterEggModal'

const Registration = () => {
  const [currentPhase, setCurrentPhase] = useState('challenge') // challenge, registration, success, admin, dashboard
  const [submittedFlag, setSubmittedFlag] = useState('')
  const [registeredTeam, setRegisteredTeam] = useState(null)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  // Check if user is already admin on page load
  useEffect(() => {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true'
    const adminLoginTime = sessionStorage.getItem('adminLoginTime')
    
    if (isAdmin && adminLoginTime) {
      // Check if login is still valid (24 hours)
      const loginTime = new Date(adminLoginTime)
      const now = new Date()
      const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60)
      
      if (hoursSinceLogin < 24) {
        setCurrentPhase('dashboard')
      } else {
        // Session expired
        sessionStorage.removeItem('isAdmin')
        sessionStorage.removeItem('adminLoginTime')
      }
    }

    // Check URL for admin access
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('admin') === 'true') {
      setCurrentPhase('admin')
    }
  }, [])

  // Handle easter egg keyboard sequence
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'h' && e.ctrlKey && e.shiftKey) {
        e.preventDefault()
        setShowEasterEgg(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleFlagSubmitted = (flag) => {
    setSubmittedFlag(flag)
    setCurrentPhase('registration')
  }

  const handleRegistrationComplete = (team) => {
    setRegisteredTeam(team)
    setCurrentPhase('success')
  }

  const handleAdminLogin = () => {
    setCurrentPhase('dashboard')
  }

  const handleAdminLogout = () => {
    setCurrentPhase('admin')
  }

  const renderPhase = () => {
    switch (currentPhase) {
      case 'challenge':
        return <CTFChallenge onFlagSubmitted={handleFlagSubmitted} />
      
      case 'registration':
        return (
          <TeamRegistration 
            submittedFlag={submittedFlag}
            onRegistrationComplete={handleRegistrationComplete}
          />
        )
      
      case 'success':
        return <RegistrationSuccess team={registeredTeam} />
      
      case 'admin':
        return <AdminLogin onLoginSuccess={handleAdminLogin} />
      
      case 'dashboard':
        return <AdminDashboard onLogout={handleAdminLogout} />
      
      default:
        return <CTFChallenge onFlagSubmitted={handleFlagSubmitted} />
    }
  }

  return (
    <div>
      {renderPhase()}
      {/* Easter Egg Modal */}
      <EasterEggModal 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)}
        isOnRegistrationPage={currentPhase === 'registration'}
      />
    </div>
  )
}

// Registration Success Component
const RegistrationSuccess = ({ team }) => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-gradient-to-br from-green-900/20 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 197, 94, 0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-2xl px-6">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent mb-4">
            Registration Successful!
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Your team has been successfully registered for CodeQuest 2025.
          </p>
        </div>

        {/* Team Details Card */}
        {team && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-green-400 mb-4">Team Details</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">Team Name: </span>
                <span className="text-white font-semibold">{team.team_name}</span>
              </div>
              <div>
                <span className="text-gray-400">Team Leader: </span>
                <span className="text-white">{team.team_leader_name}</span>
              </div>
              <div>
                <span className="text-gray-400">University: </span>
                <span className="text-white">{team.university}</span>
              </div>
              <div>
                <span className="text-gray-400">Registration ID: </span>
                <span className="text-green-400 font-mono">#{team.id}</span>
              </div>
              <div>
                <span className="text-gray-400">Status: </span>
                <span className="text-yellow-400">Pending Review</span>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-black/30 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-green-400 font-semibold mb-3">What happens next?</h3>
          <ul className="text-gray-300 space-y-2 text-sm text-left">
            <li>✅ Your registration has been submitted for review</li>
            <li>📧 You will receive a confirmation email within 24 hours</li>
            <li>⏳ Our team will review and approve your registration</li>
            <li>📅 Further event details will be shared via email</li>
            <li>💬 Join our Discord community for updates and networking</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
          >
            Back to Home
          </a>
          <a
            href="https://discord.gg/ucsc-ieee"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
          >
            Join Discord
          </a>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-gray-400 text-sm">
          <p>Need help? Contact us at <span className="text-red-400">ieee@ucsc.cmb.ac.lk</span></p>
          <p className="mt-2">© 2025 IEEE Student Branch UCSC</p>
          <p className="mt-1 text-xs">
            Developed by <a href="https://induwara.dev" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors">Induwara Uthsara</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Registration
