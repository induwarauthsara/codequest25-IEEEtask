import React, { useState, useEffect } from 'react'
import { supabase, logSecurityEvent, getClientIP, generateSessionId } from '../lib/supabase'
import { Shield, Flag, Eye, EyeOff } from 'lucide-react'

const CTFChallenge = ({ onFlagSubmitted }) => {
  const [challenge, setChallenge] = useState(null)
  const [submittedFlag, setSubmittedFlag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [showHint, setShowHint] = useState(false)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    fetchChallenge()
    // Set the flag in cookies when component mounts
    document.cookie = 'hidden_treasure=CODEQUEST{c00k13_m0nst3r_f0und_th3_tr34sur3}; path=/; max-age=3600'
    
    // Add some decoy cookies to make it more interesting
    document.cookie = 'session_id=abc123def456; path=/'
    document.cookie = 'user_theme=dark; path=/'
    document.cookie = 'csrf_token=xyz789uvw012; path=/'
    document.cookie = 'last_visit=' + new Date().toISOString() + '; path=/'
    document.cookie = 'tracking_id=guest_' + Math.random().toString(36).substr(2, 9) + '; path=/'
  }, [])

  const fetchChallenge = async () => {
    try {
      const { data, error } = await supabase
        .from('ctf_challenges')
        .select('*')
        .eq('category', 'web')
        .single()

      if (error) throw error
      setChallenge(data)
    } catch (error) {
      console.error('Error fetching challenge:', error)
      setFeedback({ type: 'error', message: 'Failed to load challenge. Please try again.' })
    }
  }

  const handleSubmitFlag = async (e) => {
    e.preventDefault()
    
    if (!challenge || !submittedFlag.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a flag!' })
      return
    }

    setIsSubmitting(true)
    const isCorrect = submittedFlag.trim() === challenge.flag
    const clientIP = await getClientIP()
    const sessionId = generateSessionId()

    try {
      // Record the submission in database
      const { error } = await supabase
        .from('flag_submissions')
        .insert([
          {
            submitted_flag: submittedFlag.trim(),
            is_correct: isCorrect,
            ip_address: clientIP
          }
        ])

      if (error) throw error

      // Log the security event
      await logSecurityEvent({
        event_type: 'flag_submission',
        user_identifier: clientIP || 'anonymous',
        ip_address: clientIP,
        event_details: {
          challenge_id: challenge.id,
          challenge_title: challenge.title,
          submitted_flag: submittedFlag.trim(),
          flag_length: submittedFlag.trim().length,
          is_correct: isCorrect,
          attempt_number: attempts + 1,
          timestamp: new Date().toISOString()
        },
        success: isCorrect,
        session_id: sessionId,
        risk_level: isCorrect ? 'low' : 'medium'
      })

      setAttempts(attempts + 1)

      if (isCorrect) {
        setFeedback({ type: 'success', message: 'Congratulations! Flag accepted. You can now proceed to team registration.' })
        onFlagSubmitted(submittedFlag.trim())
      } else {
        setFeedback({ type: 'error', message: `Incorrect flag. Attempts: ${attempts + 1}` })
        setSubmittedFlag('')

        // Log suspicious activity if too many failed attempts
        if (attempts >= 4) {
          await logSecurityEvent({
            event_type: 'suspicious_activity',
            user_identifier: clientIP || 'anonymous',
            ip_address: clientIP,
            event_details: {
              activity_type: 'multiple_failed_flag_attempts',
              challenge_id: challenge.id,
              total_attempts: attempts + 1,
              submitted_flags: [submittedFlag.trim()],
              time_window: '1h'
            },
            success: false,
            session_id: sessionId,
            risk_level: 'high'
          })
        }
      }
    } catch (error) {
      console.error('Error submitting flag:', error)
      setFeedback({ type: 'error', message: 'Failed to submit flag. Please try again.' })
      
      // Log system error
      await logSecurityEvent({
        event_type: 'flag_submission',
        user_identifier: clientIP || 'anonymous',
        ip_address: clientIP,
        event_details: {
          error_type: 'submission_failed',
          error_message: error.message,
          challenge_id: challenge?.id,
          timestamp: new Date().toISOString()
        },
        success: false,
        session_id: sessionId,
        risk_level: 'medium'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white">Loading challenge...</p>
        </div>
      </div>
    )
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
              <Shield className="w-8 h-8 text-red-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                VAULT ENTRY CHALLENGE
              </h1>
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-300 text-lg">
              Complete this challenge to unlock team registration
            </p>
          </div>

          {/* Challenge Card */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-8 mb-8 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <Flag className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-semibold text-red-400">{challenge.title}</h2>
              {challenge.points > 0 && (
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm">
                  {challenge.points} points
                </span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-300 text-lg mb-4">{challenge.description}</p>
              
              <div className="bg-black/50 p-4 rounded-lg border border-gray-700">
                <h3 className="text-red-400 font-semibold mb-2">Need Help?</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showHint ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>
                </div>
                {showHint && (
                  <div className="mt-3 space-y-2">
                    <p className="text-gray-300 text-sm">
                      💡 <strong>Easy Hint:</strong> Web browsers store small pieces of data locally. Check your developer tools (F12) and look in the "Application" or "Storage" tab.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Still stuck? Try looking for anything that might contain "treasure"...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Flag Submission Form */}
            <form onSubmit={handleSubmitFlag} className="space-y-4">
              <div>
                <label htmlFor="flag" className="block text-red-400 font-semibold mb-2">
                  Enter Flag:
                </label>
                <input
                  type="text"
                  id="flag"
                  value={submittedFlag}
                  onChange={(e) => setSubmittedFlag(e.target.value)}
                  placeholder="CODEQUEST{...}"
                  className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !submittedFlag.trim()}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </span>
                ) : (
                  'Submit Flag'
                )}
              </button>
            </form>

            {/* Feedback */}
            {feedback.message && (
              <div className={`mt-4 p-4 rounded-lg border ${
                feedback.type === 'success' 
                  ? 'bg-green-900/50 border-green-500/30 text-green-300' 
                  : 'bg-red-900/50 border-red-500/30 text-red-300'
              }`}>
                {feedback.message}
              </div>
            )}

            {/* Challenge Stats */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Category: {challenge.category.toUpperCase()}</span>
                <span>Your attempts: {attempts}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-900/30 border border-gray-700 rounded-lg p-6">
            <h3 className="text-red-400 font-semibold mb-3">Instructions:</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Flags are always in the format: CODEQUEST{'{flag_content}'}</li>
              <li>• This is a web challenge - explore browser storage mechanisms</li>
              <li>• You must solve this challenge to proceed to team registration</li>
              <li>• Try using your browser's developer tools (F12)</li>
            </ul>
            
            {/* Footer hint */}
            <div className="mt-4 pt-4 border-t border-gray-600">
              <p className="text-gray-400 text-xs italic">
                💭 "The sweetest treasures are often stored in the most convenient places..." 
                <br />
                <span className="text-gray-500">- An Anonymous Web Detective</span>
              </p>
              
              {/* Easter egg hint */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-gray-500 text-xs font-mono text-center">
                  💡 <span className="text-red-400">Hint:</span> Type the four-letter magic word that means "I need support"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTFChallenge
