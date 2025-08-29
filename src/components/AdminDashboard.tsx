import React, { useState, useEffect } from 'react'
import { supabase, logSecurityEvent, getClientIP } from '../lib/supabase'
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Mail, 
  Phone, 
  University,
  LogOut,
  Download,
  Search,
  Filter,
  Shield,
  Activity,
  AlertTriangle
} from 'lucide-react'

const AdminDashboard = ({ onLogout }) => {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [activeTab, setActiveTab] = useState('teams') // 'teams' or 'security'
  const [securityLogs, setSecurityLogs] = useState([])
  const [logsLoading, setLogsLoading] = useState(false)

  useEffect(() => {
    fetchTeams()
    // Log dashboard access
    logDashboardAccess()
  }, [])

  const logDashboardAccess = async () => {
    const clientIP = await getClientIP()
    const sessionId = sessionStorage.getItem('adminSessionId')
    
    await logSecurityEvent({
      event_type: 'data_access',
      user_identifier: 'admin',
      ip_address: clientIP,
      event_details: {
        action: 'dashboard_accessed',
        resource: 'admin_dashboard',
        timestamp: new Date().toISOString()
      },
      success: true,
      session_id: sessionId,
      risk_level: 'low'
    })
  }

  const fetchTeams = async () => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('registration_date', { ascending: false })

      if (error) throw error

      setTeams(data || [])
      
      // Calculate stats
      const statsData = data?.reduce(
        (acc, team) => {
          acc.total++
          acc[team.status]++
          return acc
        },
        { total: 0, pending: 0, approved: 0, rejected: 0 }
      ) || { total: 0, pending: 0, approved: 0, rejected: 0 }

      setStats(statsData)
    } catch (error) {
      console.error('Error fetching teams:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSecurityLogs = async () => {
    setLogsLoading(true)
    try {
      const sessionId = sessionStorage.getItem('adminSessionId')
      const response = await fetch('/api/admin/security-logs', {
        headers: {
          'admin-session-id': sessionId || ''
        }
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch security logs')
      }

      setSecurityLogs(result.data || [])
    } catch (error) {
      console.error('Error fetching security logs:', error)
    } finally {
      setLogsLoading(false)
    }
  }

  const updateTeamStatus = async (teamId, newStatus) => {
    const clientIP = await getClientIP()
    const sessionId = sessionStorage.getItem('adminSessionId')
    
    try {
      const response = await fetch('/api/admin/teams', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId,
          status: newStatus,
          adminSessionId: sessionId
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update team status')
      }

      // Log the team status change
      await logSecurityEvent({
        event_type: 'data_access',
        user_identifier: 'admin',
        ip_address: clientIP,
        event_details: {
          action: 'team_status_updated',
          team_id: teamId,
          new_status: newStatus,
          resource: 'team_management',
          timestamp: new Date().toISOString()
        },
        success: true,
        session_id: sessionId,
        risk_level: 'low'
      })

      // Refresh teams list
      fetchTeams()
      
      // Close modal if open
      setSelectedTeam(null)
    } catch (error) {
      console.error('Error updating team status:', error)
      
      // Log failed attempt
      await logSecurityEvent({
        event_type: 'data_access',
        user_identifier: 'admin',
        ip_address: clientIP,
        event_details: {
          action: 'team_status_update_failed',
          team_id: teamId,
          attempted_status: newStatus,
          error: error.message,
          timestamp: new Date().toISOString()
        },
        success: false,
        session_id: sessionId,
        risk_level: 'medium'
      })
    }
  }

  const exportTeamsData = async () => {
    const clientIP = await getClientIP()
    const sessionId = sessionStorage.getItem('adminSessionId')
    
    // Log data export
    await logSecurityEvent({
      event_type: 'data_access',
      user_identifier: 'admin',
      ip_address: clientIP,
      event_details: {
        action: 'data_exported',
        resource: 'teams_csv',
        exported_count: filteredTeams.length,
        timestamp: new Date().toISOString()
      },
      success: true,
      session_id: sessionId,
      risk_level: 'medium'
    })

    const csvContent = [
      ['Team Name', 'Leader Name', 'Leader Email', 'Leader Phone', 'University', 'Members', 'Status', 'Registration Date'].join(','),
      ...filteredTeams.map(team => [
        team.team_name,
        team.team_leader_name,
        team.team_leader_email,
        team.team_leader_phone,
        team.university,
        [team.member2_name, team.member3_name, team.member4_name].filter(Boolean).join('; '),
        team.status,
        new Date(team.registration_date).toLocaleDateString()
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `codequest-teams-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  const handleLogout = async () => {
    const clientIP = await getClientIP()
    const sessionId = sessionStorage.getItem('adminSessionId')
    
    // Log logout
    await logSecurityEvent({
      event_type: 'admin_logout',
      user_identifier: 'admin',
      ip_address: clientIP,
      event_details: {
        action: 'session_ended',
        session_duration_minutes: Math.round((Date.now() - new Date(sessionStorage.getItem('adminLoginTime')).getTime()) / (1000 * 60)),
        timestamp: new Date().toISOString()
      },
      success: true,
      session_id: sessionId,
      risk_level: 'low'
    })

    sessionStorage.removeItem('isAdmin')
    sessionStorage.removeItem('adminLoginTime')
    sessionStorage.removeItem('adminSessionId')
    localStorage.removeItem('loginFailures') // Reset failure counter on successful logout
    
    if (onLogout) {
      onLogout()
    }
  }

  // Filter teams based on search and status
  const filteredTeams = teams.filter(team => {
    const matchesSearch = !searchTerm || 
      team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.team_leader_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.team_leader_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.university.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || team.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-red-500/30 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">CodeQuest Team Management</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={exportTeamsData}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-gray-900/50 p-2 rounded-lg border border-gray-700">
            <button
              onClick={() => setActiveTab('teams')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'teams'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Team Management</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('security')
                if (securityLogs.length === 0) fetchSecurityLogs()
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === 'security'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security Logs</span>
            </button>
          </div>
        </div>

        {activeTab === 'teams' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Total Teams</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Approved</p>
                <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <XCircle className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-gray-400 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search teams, names, emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-black/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-black/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-red-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="text-sm text-gray-400">
              Showing {filteredTeams.length} of {teams.length} teams
            </div>
          </div>
        </div>

        {/* Teams Table */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Team</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Leader</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">University</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Members</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTeams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{team.team_name}</p>
                        <p className="text-xs text-gray-400">ID: {team.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white">{team.team_leader_name}</p>
                        <p className="text-sm text-gray-400">{team.team_leader_email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {team.university}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300">
                        {[team.member2_name, team.member3_name, team.member4_name]
                          .filter(Boolean)
                          .map(name => name.split(' ')[0])
                          .join(', ') || 'Solo'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        team.status === 'approved' 
                          ? 'bg-green-900/50 text-green-300 border border-green-500/30'
                          : team.status === 'rejected'
                          ? 'bg-red-900/50 text-red-300 border border-red-500/30'
                          : 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(team.registration_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedTeam(team)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          View
                        </button>
                        {team.status !== 'approved' && (
                          <button
                            onClick={() => updateTeamStatus(team.id, 'approved')}
                            className="text-green-400 hover:text-green-300 text-sm"
                          >
                            Approve
                          </button>
                        )}
                        {team.status !== 'rejected' && (
                          <button
                            onClick={() => updateTeamStatus(team.id, 'rejected')}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredTeams.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No teams found matching your criteria.
              </div>
            )}
          </div>
        </div>
        </>
        )}

        {/* Security Logs Section */}
        {activeTab === 'security' && (
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-semibold text-red-400">Security Audit Log</h2>
                </div>
                <button
                  onClick={fetchSecurityLogs}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <Activity className="w-4 h-4" />
                  <span>Refresh Logs</span>
                </button>
              </div>
            </div>

            {logsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading security logs...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Timestamp</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Event</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">IP Address</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Risk</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-red-400">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {securityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            log.event_type === 'admin_login' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
                            log.event_type === 'admin_login_failed' ? 'bg-red-900/50 text-red-300 border border-red-500/30' :
                            log.event_type === 'admin_logout' ? 'bg-blue-900/50 text-blue-300 border border-blue-500/30' :
                            log.event_type === 'suspicious_activity' ? 'bg-red-900/50 text-red-300 border border-red-500/30' :
                            'bg-gray-900/50 text-gray-300 border border-gray-500/30'
                          }`}>
                            {log.event_type.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white">
                          {log.user_identifier}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300 font-mono">
                          {log.ip_address || 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            log.success 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-red-900/50 text-red-300'
                          }`}>
                            {log.success ? 'SUCCESS' : 'FAILED'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            log.risk_level === 'critical' ? 'bg-red-900/50 text-red-300' :
                            log.risk_level === 'high' ? 'bg-orange-900/50 text-orange-300' :
                            log.risk_level === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                            'bg-gray-900/50 text-gray-300'
                          }`}>
                            {log.risk_level === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {log.risk_level.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {log.event_details ? (
                            <details className="cursor-pointer">
                              <summary className="text-blue-400 hover:text-blue-300">View Details</summary>
                              <pre className="mt-2 text-xs bg-gray-800/50 p-2 rounded overflow-x-auto">
                                {JSON.stringify(log.event_details, null, 2)}
                              </pre>
                            </details>
                          ) : (
                            'No details'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {securityLogs.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No security logs found. Logs will appear as users interact with the system.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      {/* Team Detail Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 border border-red-500/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-red-400">Team Details</h2>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Team Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Team Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Team Name</p>
                      <p className="text-white">{selectedTeam.team_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">University</p>
                      <p className="text-white">{selectedTeam.university}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedTeam.status === 'approved' 
                          ? 'bg-green-900/50 text-green-300 border border-green-500/30'
                          : selectedTeam.status === 'rejected'
                          ? 'bg-red-900/50 text-red-300 border border-red-500/30'
                          : 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
                      }`}>
                        {selectedTeam.status.charAt(0).toUpperCase() + selectedTeam.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Registration Date</p>
                      <p className="text-white">{new Date(selectedTeam.registration_date).toLocaleString()}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-400 text-sm">Submitted Flag</p>
                      <p className="text-white font-mono">{selectedTeam.flag_submitted}</p>
                    </div>
                  </div>
                </div>

                {/* Leader Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Team Leader</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white">{selectedTeam.team_leader_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{selectedTeam.team_leader_email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">{selectedTeam.team_leader_phone}</p>
                    </div>
                  </div>
                </div>

                {/* Members Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Team Members</h3>
                  <div className="space-y-3">
                    {[
                      { name: selectedTeam.member2_name, email: selectedTeam.member2_email, num: 2 },
                      { name: selectedTeam.member3_name, email: selectedTeam.member3_email, num: 3 },
                      { name: selectedTeam.member4_name, email: selectedTeam.member4_email, num: 4 }
                    ].map((member, index) => 
                      member.name ? (
                        <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                          <p className="text-gray-400 text-sm">Member {member.num}</p>
                          <p className="text-white">{member.name}</p>
                          {member.email && <p className="text-gray-300 text-sm">{member.email}</p>}
                        </div>
                      ) : null
                    )}
                    {![selectedTeam.member2_name, selectedTeam.member3_name, selectedTeam.member4_name].some(Boolean) && (
                      <p className="text-gray-400 italic">Solo team - no additional members</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-700">
                  {selectedTeam.status !== 'approved' && (
                    <button
                      onClick={() => updateTeamStatus(selectedTeam.id, 'approved')}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve Team</span>
                    </button>
                  )}
                  {selectedTeam.status !== 'rejected' && (
                    <button
                      onClick={() => updateTeamStatus(selectedTeam.id, 'rejected')}
                      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject Team</span>
                    </button>
                  )}
                  {selectedTeam.status === 'approved' && (
                    <button
                      onClick={() => updateTeamStatus(selectedTeam.id, 'pending')}
                      className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                      <span>Mark as Pending</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default AdminDashboard
