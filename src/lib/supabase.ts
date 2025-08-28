import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface CTFChallenge {
  id: number
  title: string
  description: string
  flag: string
  points: number
  category: string
  created_at: string
}

export interface Team {
  id: number
  team_name: string
  team_leader_name: string
  team_leader_email: string
  team_leader_phone: string
  member2_name?: string
  member2_email?: string
  member3_name?: string
  member3_email?: string
  member4_name?: string
  member4_email?: string
  university: string
  flag_submitted: string
  registration_date: string
  status: 'pending' | 'approved' | 'rejected'
}

export interface FlagSubmission {
  id: number
  submitted_flag: string
  is_correct: boolean
  submitted_at: string
  ip_address?: string
}

export interface SecurityLog {
  id: number
  event_type: 'admin_login' | 'admin_login_failed' | 'admin_logout' | 'team_registration' | 'flag_submission' | 'data_access' | 'suspicious_activity'
  user_identifier: string
  ip_address?: string
  user_agent?: string
  event_details?: Record<string, any>
  success: boolean
  timestamp: string
  session_id?: string
  risk_level: 'low' | 'medium' | 'high' | 'critical'
}

// Security logging utility functions
export const logSecurityEvent = async (eventData: Omit<SecurityLog, 'id' | 'timestamp'>) => {
  try {
    const { error } = await supabase
      .from('security_logs')
      .insert([{
        event_type: eventData.event_type,
        user_identifier: eventData.user_identifier,
        ip_address: eventData.ip_address || null,
        user_agent: eventData.user_agent || (typeof window !== 'undefined' ? navigator.userAgent : null),
        event_details: eventData.event_details || null,
        success: eventData.success,
        session_id: eventData.session_id || (typeof window !== 'undefined' ? sessionStorage.getItem('sessionId') : null),
        risk_level: eventData.risk_level || 'low'
      }])

    if (error) {
      console.error('Failed to log security event:', error)
    }
  } catch (error) {
    console.error('Security logging error:', error)
  }
}

// Get client IP address (approximation)
export const getClientIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error('Failed to get IP address:', error)
    return null
  }
}

// Generate session ID
export const generateSessionId = () => {
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('sessionId')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('sessionId', sessionId)
    }
    return sessionId
  }
  return null
}
