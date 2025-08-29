import { createClient } from '@supabase/supabase-js'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if environment variables are set
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Missing environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
    return res.status(500).json({ 
      error: 'Server configuration error. Please check environment variables.' 
    })
  }

  // For now, use the anonymous key with the temporary admin policy
  // In production, you should use the service role key
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Basic authentication check - in a production environment, you'd use proper JWT tokens
  const isAdmin = req.headers.authorization === 'Bearer admin-token' || req.headers['admin-session-id']

  if (!isAdmin) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { data, error } = await supabase
      .from('security_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to fetch security logs' })
    }

    res.status(200).json({ success: true, data })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
