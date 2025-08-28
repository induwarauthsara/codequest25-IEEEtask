import React, { useState } from 'react'
import { supabase, logSecurityEvent, getClientIP, generateSessionId } from '../lib/supabase'
import { Users, Mail, Phone, University, User } from 'lucide-react'

const TeamRegistration = ({ submittedFlag, onRegistrationComplete }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    teamLeaderEmail: '',
    teamLeaderPhone: '',
    member2Name: '',
    member2Email: '',
    member3Name: '',
    member3Email: '',
    member4Name: '',
    member4Email: '',
    university: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const required = ['teamName', 'teamLeaderName', 'teamLeaderEmail', 'teamLeaderPhone', 'university']
    
    for (const field of required) {
      if (!formData[field].trim()) {
        setFeedback({ 
          type: 'error', 
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` 
        })
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.teamLeaderEmail)) {
      setFeedback({ type: 'error', message: 'Please enter a valid team leader email.' })
      return false
    }

    // Check additional member emails if provided
    const memberEmails = [formData.member2Email, formData.member3Email, formData.member4Email]
    for (let i = 0; i < memberEmails.length; i++) {
      if (memberEmails[i] && !emailRegex.test(memberEmails[i])) {
        setFeedback({ type: 'error', message: `Please enter a valid email for member ${i + 2}.` })
        return false
      }
    }

    // Phone validation (basic)
    const phoneRegex = /^[+]?[\d\s\-()]+$/
    if (!phoneRegex.test(formData.teamLeaderPhone)) {
      setFeedback({ type: 'error', message: 'Please enter a valid phone number.' })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    const clientIP = await getClientIP()
    const sessionId = generateSessionId()

    try {
      const teamData = {
        team_name: formData.teamName.trim(),
        team_leader_name: formData.teamLeaderName.trim(),
        team_leader_email: formData.teamLeaderEmail.trim().toLowerCase(),
        team_leader_phone: formData.teamLeaderPhone.trim(),
        member2_name: formData.member2Name.trim() || null,
        member2_email: formData.member2Email.trim().toLowerCase() || null,
        member3_name: formData.member3Name.trim() || null,
        member3_email: formData.member3Email.trim().toLowerCase() || null,
        member4_name: formData.member4Name.trim() || null,
        member4_email: formData.member4Email.trim().toLowerCase() || null,
        university: formData.university.trim(),
        flag_submitted: submittedFlag,
        status: 'pending'
      }

      const { data, error } = await supabase
        .from('teams')
        .insert([teamData])
        .select()

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          if (error.message.includes('team_name')) {
            throw new Error('Team name already exists. Please choose a different name.')
          } else if (error.message.includes('team_leader_email')) {
            throw new Error('This email is already registered. Each email can only be used once.')
          }
        }
        throw error
      }

      // Log successful registration
      await logSecurityEvent({
        event_type: 'team_registration',
        user_identifier: formData.teamLeaderEmail.trim().toLowerCase(),
        ip_address: clientIP,
        event_details: {
          team_name: formData.teamName.trim(),
          team_leader: formData.teamLeaderName.trim(),
          university: formData.university.trim(),
          member_count: [formData.member2Name, formData.member3Name, formData.member4Name].filter(Boolean).length + 1,
          flag_used: submittedFlag,
          registration_id: data[0].id,
          timestamp: new Date().toISOString()
        },
        success: true,
        session_id: sessionId,
        risk_level: 'low'
      })

      setFeedback({ 
        type: 'success', 
        message: 'Team registration successful! You will receive a confirmation email shortly.' 
      })
      
      // Call the callback function
      if (onRegistrationComplete) {
        onRegistrationComplete(data[0])
      }

    } catch (error) {
      console.error('Error registering team:', error)
      
      // Log failed registration
      await logSecurityEvent({
        event_type: 'team_registration',
        user_identifier: formData.teamLeaderEmail.trim().toLowerCase(),
        ip_address: clientIP,
        event_details: {
          error_type: 'registration_failed',
          error_message: error.message,
          attempted_team_name: formData.teamName.trim(),
          attempted_email: formData.teamLeaderEmail.trim().toLowerCase(),
          university: formData.university.trim(),
          flag_used: submittedFlag,
          timestamp: new Date().toISOString()
        },
        success: false,
        session_id: sessionId,
        risk_level: 'medium'
      })

      setFeedback({ 
        type: 'error', 
        message: error.message || 'Failed to register team. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-gradient-to-br from-red-900/20 to-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(239, 68, 68, 0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 mb-6">
              <Users className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                TEAM REGISTRATION
              </h1>
              <Users className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-300 text-lg">
              Register your team for CodeQuest 2025
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-green-900/50 text-green-300 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Flag Verified: {submittedFlag}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 shadow-2xl">
            {/* Team Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Information</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="teamName" className="block text-gray-300 font-medium mb-2">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    placeholder="Enter your team name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="university" className="block text-gray-300 font-medium mb-2">
                    University *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    placeholder="University/Institution name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Leader Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Team Leader Information</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="teamLeaderName" className="block text-gray-300 font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="teamLeaderName"
                    name="teamLeaderName"
                    value={formData.teamLeaderName}
                    onChange={handleInputChange}
                    placeholder="Team leader's full name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="teamLeaderPhone" className="block text-gray-300 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="teamLeaderPhone"
                    name="teamLeaderPhone"
                    value={formData.teamLeaderPhone}
                    onChange={handleInputChange}
                    placeholder="+94 xxx xxx xxxx"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="teamLeaderEmail" className="block text-gray-300 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="teamLeaderEmail"
                    name="teamLeaderEmail"
                    value={formData.teamLeaderEmail}
                    onChange={handleInputChange}
                    placeholder="leader@example.com"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Team Members Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Team Members (Optional)</span>
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Teams can have 1-4 members total. Additional members are optional.
              </p>

              {/* Member 2 */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="member2Name" className="block text-gray-300 font-medium mb-2">
                    Member 2 Name
                  </label>
                  <input
                    type="text"
                    id="member2Name"
                    name="member2Name"
                    value={formData.member2Name}
                    onChange={handleInputChange}
                    placeholder="Member 2 full name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="member2Email" className="block text-gray-300 font-medium mb-2">
                    Member 2 Email
                  </label>
                  <input
                    type="email"
                    id="member2Email"
                    name="member2Email"
                    value={formData.member2Email}
                    onChange={handleInputChange}
                    placeholder="member2@example.com"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>

              {/* Member 3 */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="member3Name" className="block text-gray-300 font-medium mb-2">
                    Member 3 Name
                  </label>
                  <input
                    type="text"
                    id="member3Name"
                    name="member3Name"
                    value={formData.member3Name}
                    onChange={handleInputChange}
                    placeholder="Member 3 full name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="member3Email" className="block text-gray-300 font-medium mb-2">
                    Member 3 Email
                  </label>
                  <input
                    type="email"
                    id="member3Email"
                    name="member3Email"
                    value={formData.member3Email}
                    onChange={handleInputChange}
                    placeholder="member3@example.com"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>

              {/* Member 4 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="member4Name" className="block text-gray-300 font-medium mb-2">
                    Member 4 Name
                  </label>
                  <input
                    type="text"
                    id="member4Name"
                    name="member4Name"
                    value={formData.member4Name}
                    onChange={handleInputChange}
                    placeholder="Member 4 full name"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
                <div>
                  <label htmlFor="member4Email" className="block text-gray-300 font-medium mb-2">
                    Member 4 Email
                  </label>
                  <input
                    type="email"
                    id="member4Email"
                    name="member4Email"
                    value={formData.member4Email}
                    onChange={handleInputChange}
                    placeholder="member4@example.com"
                    className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Feedback */}
            {feedback.message && (
              <div className={`mb-6 p-4 rounded-lg border ${
                feedback.type === 'success' 
                  ? 'bg-green-900/50 border-green-500/30 text-green-300' 
                  : 'bg-red-900/50 border-red-500/30 text-red-300'
              }`}>
                {feedback.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Registering Team...</span>
                </span>
              ) : (
                'Register Team'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TeamRegistration
