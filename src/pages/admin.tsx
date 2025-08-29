import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AdminLogin from '../components/AdminLogin'
import AdminDashboard from '../components/AdminDashboard'

const Admin = () => {
  const [currentPhase, setCurrentPhase] = useState('login') // login, dashboard
  const router = useRouter()

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
        sessionStorage.removeItem('adminSessionId')
        setCurrentPhase('login')
      }
    }
  }, [])

  const handleAdminLogin = () => {
    setCurrentPhase('dashboard')
  }

  const handleAdminLogout = () => {
    setCurrentPhase('login')
    // Optionally redirect to home page
    // router.push('/')
  }

  const renderPhase = () => {
    switch (currentPhase) {
      case 'login':
        return <AdminLogin onLoginSuccess={handleAdminLogin} />
      
      case 'dashboard':
        return <AdminDashboard onLogout={handleAdminLogout} />
      
      default:
        return <AdminLogin onLoginSuccess={handleAdminLogin} />
    }
  }

  return (
    <>
      <Head>
        <title>Admin Panel - CodeQuest 2025</title>
        <meta name="description" content="Admin panel for CodeQuest 2025 CTF competition" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900">
        {renderPhase()}
      </div>
    </>
  )
}

export default Admin
