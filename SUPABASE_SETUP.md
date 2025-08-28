# Supabase Setup Guide for CodeQuest

This guide will help you set up Supabase for your CodeQuest application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Project Name**: `codequest-2025`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (usually 1-2 minutes)

## Step 2: Get Your Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **API Keys** → **anon/public**: `eyJ0eXAiOiJKV1QiLCJhbGciOiJI...`

## Step 3: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

3. **Important**: Never commit `.env.local` to git! It's already in `.gitignore`.
   - **Project URL** (something like `https://abcdefghijk.supabase.co`)
   - **Project API keys** → **anon/public** key

## Step 3: Update Environment Variables

1. Open `.env.local` in your project root
2. Replace the placeholder values:

```bash
# Replace these with your actual Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Admin credentials (you can change these)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=codequest2025admin
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the contents of `supabase-schema.sql` file
4. Click "Run" to execute the SQL commands

This will create:

- `ctf_challenges` table for CTF challenges
- `flag_submissions` table for tracking flag submissions
- `teams` table for team registrations
- `security_logs` table for security audit logging
- Sample challenge data
- Row Level Security policies

## Step 5: Verify Setup

1. Go to **Table editor** in Supabase dashboard
2. You should see three tables:
   - `ctf_challenges` (with 1 sample challenge)
   - `flag_submissions` (empty)
   - `teams` (empty)

## Step 6: Test the Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/registration`

3. Test the CTF challenge:
   - Look for the flag in the HTML source code
   - Flag: `CODEQUEST{w3lc0m3_t0_th3_v4ult_2025}`
   - Submit it to proceed to team registration

4. Test team registration by filling out the form

5. Test admin panel:
   - Visit `http://localhost:3000/registration?admin=true`
   - Login with credentials from your `.env.local`
   - View registered teams and manage their status

## Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **Admin Credentials**: Change the default admin credentials in production
3. **Supabase Keys**: The anon key is safe to expose in client-side code
4. **Database Security**: Row Level Security (RLS) is enabled for data protection

## Database Schema Overview

### ctf_challenges
- Stores CTF challenge data (title, description, flag, points)
- Pre-populated with one web challenge

### flag_submissions
- Tracks all flag submission attempts
- Records correctness and timestamps

### teams

- Stores team registration information
- Supports 1-4 members per team
- Tracks registration status (pending/approved/rejected)

### security_logs

- Comprehensive audit logging system
- Tracks all security-related events (logins, registrations, data access)
- Records IP addresses, user agents, and event details
- Risk level classification (low/medium/high/critical)
- Session tracking for user activities

## Admin Panel Features

1. **Dashboard Statistics**: View total teams and their status distribution
2. **Team Management**: Approve, reject, or modify team registrations
3. **Data Export**: Export team data to CSV
4. **Search & Filter**: Find teams by name, email, or university
5. **Team Details**: View complete team information including submitted flag
6. **Security Audit Log**: Monitor all system activities and security events
7. **Real-time Logging**: Track logins, registrations, data access, and suspicious activities
8. **Risk Assessment**: Automatic risk level classification for security events

## Troubleshooting

### Common Issues:

1. **Connection Errors**: 
   - Check your internet connection
   - Verify Supabase URL and API key
   - Ensure your Supabase project is active

2. **Database Errors**:
   - Make sure you ran the SQL schema file
   - Check if RLS policies are properly set up
   - Verify table permissions in Supabase dashboard

3. **Admin Login Issues**:
   - Check environment variables are loaded correctly
   - Clear browser session storage
   - Verify admin credentials match `.env.local`

### Getting Help:

1. Check Supabase dashboard for error logs
2. Open browser developer tools to see client errors
3. Review the Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables to your deployment platform
2. Update CORS settings in Supabase if needed
3. Consider upgrading to Supabase Pro for production workloads
4. Set up proper backup and monitoring

That's it! Your CodeQuest application should now be fully functional with Supabase integration.
