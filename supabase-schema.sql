-- CodeQuest Database Schema for Supabase

-- Table for CTF challenges (pre-registration challenge)
CREATE TABLE ctf_challenges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    flag VARCHAR(255) NOT NULL,
    points INTEGER DEFAULT 100,
    category VARCHAR(100) DEFAULT 'web',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table for flag submissions
CREATE TABLE flag_submissions (
    id SERIAL PRIMARY KEY,
    submitted_flag VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET
);

-- Table for team registrations
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE,
    team_leader_name VARCHAR(255) NOT NULL,
    team_leader_email VARCHAR(255) NOT NULL UNIQUE,
    team_leader_phone VARCHAR(20) NOT NULL,
    member2_name VARCHAR(255),
    member2_email VARCHAR(255),
    member3_name VARCHAR(255),
    member3_email VARCHAR(255),
    member4_name VARCHAR(255),
    member4_email VARCHAR(255),
    university VARCHAR(255) NOT NULL,
    flag_submitted VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- Table for security audit logs
CREATE TABLE security_logs (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL, -- 'admin_login', 'admin_login_failed', 'admin_logout', 'team_registration', 'flag_submission', 'data_access'
    user_identifier VARCHAR(255), -- username, email, or IP address
    ip_address INET,
    user_agent TEXT,
    event_details JSONB, -- Additional event-specific data
    success BOOLEAN DEFAULT true,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(255), -- For tracking user sessions
    risk_level VARCHAR(10) DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical'))
);

-- Create index for performance
CREATE INDEX idx_security_logs_timestamp ON security_logs(timestamp DESC);
CREATE INDEX idx_security_logs_event_type ON security_logs(event_type);
CREATE INDEX idx_security_logs_ip_address ON security_logs(ip_address);
CREATE INDEX idx_security_logs_risk_level ON security_logs(risk_level);

-- Insert a sample CTF challenge
INSERT INTO ctf_challenges (title, description, flag, points, category) VALUES 
(
    'The Cookie Vault',
    'Every vault has its secrets, and this one keeps them in unexpected places. Sweet treasures await those who know where to look... 🍪',
    'CODEQUEST{c00k13_m0nst3r_f0und_th3_tr34sur3}',
    0,
    'web'
);

-- Row Level Security (RLS) Policies
ALTER TABLE ctf_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE flag_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- Allow read access to challenges for everyone
CREATE POLICY "Anyone can view challenges" ON ctf_challenges
    FOR SELECT USING (true);

-- Allow anyone to submit flags
CREATE POLICY "Anyone can submit flags" ON flag_submissions
    FOR INSERT WITH CHECK (true);

-- Allow anyone to register teams
CREATE POLICY "Anyone can register teams" ON teams
    FOR INSERT WITH CHECK (true);

-- Allow anyone to view their own team registration
CREATE POLICY "Anyone can view teams" ON teams
    FOR SELECT USING (true);

-- Allow anyone to create security logs (for audit purposes)
CREATE POLICY "Anyone can create security logs" ON security_logs
    FOR INSERT WITH CHECK (true);

-- Only allow viewing security logs with service role (admin access)
CREATE POLICY "Service role can view security logs" ON security_logs
    FOR SELECT USING (auth.role() = 'service_role');

-- Note: For admin access, you'll need to create admin-specific policies or use service role key
