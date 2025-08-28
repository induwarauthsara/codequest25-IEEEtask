# 🚀 CodeQuest – Vault Edition

<div align="center">

![CodeQuest Banner](https://img.shields.io/badge/CodeQuest-Vault%20re-Edition-red?style=for-the-badge&logo=hackthebox&logoColor=white)

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**The Official Web Platform for CodeQuest CTF Hackathon**  
*Organized by IEEE Student Branch of UCSC*

[🔗 Live Demo](https://codequest25-ieee-task.vercel.app) | [📖 Documentation](#-documentation) | [🚀 Get Started](#-quick-setup)

</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Setup](#-quick-setup)
- [🗄️ Database Setup](#️-database-setup)
- [🎮 How to Use](#-how-to-use)
- [🔒 Security Features](#-security-features)
- [📁 Project Structure](#-project-structure)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)

---

## 🎯 Project Overview

CodeQuest – Vault Edition is the official web platform for the Capture the Flag (CTF) hackathon organized by the IEEE Student Branch of UCSC. This full-stack web application provides a complete event management system with a cybersecurity-themed user interface.

### 🎨 Design Philosophy
The platform embraces a **cybersecurity gaming atmosphere** with a red & black neon hacker theme, complete with:
- Matrix rain effects and cyber grid backgrounds
- Glitch animations and neon glow effects
- Interactive UI components with hacker-style typography
- Immersive experience that makes users feel like they're entering a **cyber vault**

### 🏆 Event Details
- **Event**: CodeQuest CTF Hackathon 2025
- **Organizer**: IEEE Student Branch of UCSC
- **Date**: March 25, 2025
- **Format**: 24-hour cybersecurity challenge
- **Categories**: Web Exploitation, Cryptography, Reverse Engineering, Forensics

---

## ✨ Features

### 🎮 Core Functionality

#### 🔓 **Cookie-Based CTF Challenge**
- Pre-registration web challenge using HTTP cookies
- Flag hidden in browser storage: `CODEQUEST{c00k13_m0nst3r_f0und_th3_tr34sur3}`
- Progressive hint system for different skill levels
- Easter egg modal activated by typing "help"

#### 👥 **Team Registration System**
- Complete team registration form (1-4 members)
- Team leader and member information collection
- Email validation and duplicate prevention
- Registration confirmation system

#### 🔐 **Admin Dashboard**
- Secure admin authentication with hardcoded credentials
- Team management with status updates (pending/approved/rejected)
- CSV export functionality for team data
- Real-time security audit log viewer
- Risk level assessment and monitoring

#### 🛡️ **Advanced Security Logging**
- Comprehensive audit trail for all user actions
- IP tracking and session management
- Risk level classification (low/medium/high/critical)
- Failed login attempt monitoring
- Suspicious activity detection

### 🎨 **User Interface Features**

#### 🖥️ **Landing Page**
- **Hero Section**: Matrix rain effects with typing animations
- **Event Timeline**: Interactive timeline with cyber-themed milestones
- **Prizes Section**: LKR 120,000 total prize pool display
- **Team Section**: Organizer profiles with contact information
- **FAQ Section**: Expandable accordion with event details

#### 🎪 **Interactive Elements**
- Custom cyberpunk cursor with trailing effects
- Matrix rain background animation
- Glitch button animations and hover effects
- Typing text effects for dynamic content
- Smooth scrolling and reveal animations
- Responsive design (mobile → desktop)

### 🚀 **Technical Features**

#### ⚡ **Performance**
- Built with Next.js 15 and React 19
- Server-side rendering for optimal SEO
- Turbopack build system for fast development
- Optimized images and lazy loading
- Vercel deployment for global CDN

#### 🔧 **Developer Experience**
- Full TypeScript implementation
- ESLint and Prettier configuration
- Component-based architecture
- Custom hooks for state management
- Modular CSS with Tailwind

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.5.2
- **Library**: React 19.1.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Animations**: CSS Keyframes + Tailwind

### **Backend & Database**
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **File Storage**: Supabase Storage
- **API**: Next.js API Routes

### **Deployment & Tools**
- **Hosting**: Vercel
- **Version Control**: Git + GitHub
- **Package Manager**: npm
- **Build Tool**: Turbopack
- **Linting**: ESLint + Prettier

---

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works great)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/induwarauthsara/codequest25-IEEEtask.git
cd codequest25-IEEEtask
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Admin Configuration (change these!)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=codequest2025admin
```

### 4. Database Setup
See the [Database Setup](#️-database-setup) section below for detailed instructions.

### 5. Start Development Server
```bash
npm run dev
```

### 6. Open Your Browser
Navigate to `http://localhost:3000` and start exploring! 🚀

---

## 🗄️ Database Setup

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - **Project Name**: `codequest-2025`
   - **Database Password**: Create a strong password
   - **Region**: Choose closest to your users
4. Wait for setup completion (1-2 minutes)

### Step 2: Get Project Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **API Keys** → **anon/public**: Your anon key

### Step 3: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste the following schema:

```sql
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
    event_type VARCHAR(50) NOT NULL,
    user_identifier VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    event_details JSONB,
    success BOOLEAN DEFAULT true,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(255),
    risk_level VARCHAR(10) DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical'))
);

-- Create indexes for performance
CREATE INDEX idx_security_logs_timestamp ON security_logs(timestamp DESC);
CREATE INDEX idx_security_logs_event_type ON security_logs(event_type);
CREATE INDEX idx_security_logs_ip_address ON security_logs(ip_address);
CREATE INDEX idx_security_logs_risk_level ON security_logs(risk_level);

-- Insert sample CTF challenge
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
CREATE POLICY "Anyone can view challenges" ON ctf_challenges FOR SELECT USING (true);

-- Allow anyone to submit flags
CREATE POLICY "Anyone can submit flags" ON flag_submissions FOR INSERT WITH CHECK (true);

-- Allow anyone to register teams
CREATE POLICY "Anyone can register teams" ON teams FOR INSERT WITH CHECK (true);

-- Allow anyone to view their own team registration
CREATE POLICY "Anyone can view teams" ON teams FOR SELECT USING (true);

-- Allow anyone to create security logs (for audit purposes)
CREATE POLICY "Anyone can create security logs" ON security_logs FOR INSERT WITH CHECK (true);

-- Only allow viewing security logs with service role (admin access)
CREATE POLICY "Service role can view security logs" ON security_logs FOR SELECT USING (auth.role() = 'service_role');
```

3. Click "Run" to execute the schema

### Step 4: Verify Setup

Check that these tables were created:
- `ctf_challenges` - Stores CTF challenge data
- `flag_submissions` - Tracks flag submission attempts
- `teams` - Team registration information
- `security_logs` - Comprehensive audit trail

---

## 🎮 How to Use

### For Participants

#### 1. **Solve the Cookie Challenge**
- Visit the registration page
- Solve the cookie-based CTF challenge
- Flag is hidden in browser cookies: `hidden_treasure`
- Use developer tools (F12) → Application/Storage → Cookies
- Submit flag: `CODEQUEST{c00k13_m0nst3r_f0und_th3_tr34sur3}`

#### 2. **Team Registration**
- After successful flag submission, fill out team registration form
- Provide team leader details (name, email, phone)
- Add team members (optional, up to 3 additional members)
- Specify university/institution
- Submit registration

#### 3. **Easter Eggs**
- Type "help" anywhere on the site to open help modal
- Use `Ctrl+Shift+H` on registration page for advanced hints
- Explore the cyberpunk cursor effects

### For Admins

#### 1. **Access Admin Panel**
- Navigate to `/registration?admin=true`
- Login with credentials:
  - **Username**: `admin`
  - **Password**: `codequest2025admin`

#### 2. **Team Management**
- View all registered teams
- Update team status (pending → approved/rejected)
- Export team data as CSV
- View team details and member information

#### 3. **Security Monitoring**
- Switch to "Security Logs" tab
- Monitor all system activities in real-time
- View risk levels and suspicious activities
- Track login attempts and system access

---

## 🔒 Security Features

### **Comprehensive Audit Logging**
- All user actions are logged with timestamps
- IP address tracking for security monitoring
- Session ID tracking for user activity correlation
- Risk level assessment for each event

### **Monitored Events**
- **Login Attempts**: Success/failure tracking
- **Flag Submissions**: All attempts logged with metadata
- **Team Registrations**: Complete registration process tracking
- **Admin Access**: Admin panel access and actions
- **Suspicious Activities**: Failed login patterns, multiple attempts

### **Risk Level Classification**
- **Low**: Normal user activities
- **Medium**: Failed attempts, system errors
- **High**: Multiple failed attempts, suspicious patterns
- **Critical**: Security breaches, system threats

### **Data Protection**
- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive configuration
- Secure admin authentication with session management
- Input validation and sanitization

---

## 📁 Project Structure

```
codequest25-IEEEtask/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/           # React components
│   │   ├── CTFChallenge.tsx     # Cookie-based CTF challenge
│   │   ├── TeamRegistration.tsx # Team registration form
│   │   ├── AdminLogin.tsx       # Admin authentication
│   │   ├── AdminDashboard.tsx   # Admin panel with security logs
│   │   ├── EasterEggModal.tsx   # Help modal with hints
│   │   ├── CustomCursor.tsx     # Cyberpunk cursor effect
│   │   ├── MatrixRain.tsx       # Matrix background animation
│   │   ├── CyberGrid.tsx        # Cyber grid background
│   │   ├── GlitchButton.tsx     # Animated buttons
│   │   ├── TypingText.tsx       # Typing animation effect
│   │   ├── LoadingScreen.tsx    # Initial loading screen
│   │   └── [other components]   # FAQ, Timeline, Cards, etc.
│   ├── lib/
│   │   └── supabase.ts         # Supabase client & security utils
│   ├── pages/
│   │   ├── _app.tsx            # Global app configuration
│   │   ├── _document.tsx       # HTML document structure
│   │   ├── index.tsx           # Landing page
│   │   └── registration.tsx    # Registration flow
│   ├── index.css              # Global styles & animations
│   └── vite-env.d.ts          # TypeScript definitions
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── supabase-schema.sql        # Complete database schema
├── package.json               # Project dependencies
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect to GitHub**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project" → Import from GitHub
   - Select your repository
   - Add environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=your-secure-password
     ```

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://your-app.vercel.app`

### Alternative Deployment Options

- **Netlify**: Similar process to Vercel
- **Railway**: Full-stack hosting with database
- **Heroku**: Traditional PaaS deployment
- **Self-hosted**: Docker containerization available

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### **Contribution Guidelines**
- Follow TypeScript best practices
- Maintain the cyberpunk theme consistency
- Add proper error handling and logging
- Include tests for new features
- Update documentation as needed

### **Areas for Improvement**
- Additional CTF challenges
- Enhanced security features
- Mobile app development
- Integration with external CTF platforms
- Advanced analytics and reporting

---

## 📞 Support

### **Getting Help**

- **Documentation Issues**: Check this README and inline comments
- **Technical Problems**: Open an issue on GitHub
- **Security Concerns**: Email directly to maintainers
- **Event Questions**: Contact IEEE UCSC directly

### **Contact Information**

- **GitHub**: [@induwarauthsara](https://github.com/induwarauthsara)
- **Project Issues**: [GitHub Issues](https://github.com/induwarauthsara/codequest25-IEEEtask/issues)
- **IEEE UCSC**: ieee@ucsc.cmb.ac.lk

### **Community**

- **Discord**: Join our Discord server for real-time support
- **Workshops**: Attend pre-event workshops for hands-on help
- **Documentation**: Comprehensive guides available in the repository

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **IEEE Student Branch UCSC** - Event organization and support
- **Supabase** - Database and authentication infrastructure
- **Vercel** - Hosting and deployment platform
- **Next.js Team** - Amazing React framework
- **Open Source Community** - Various libraries and tools used

---

<div align="center">

**Made with ❤️ for the cybersecurity community**

*CodeQuest – Vault Edition 2025*  
*IEEE Student Branch of UCSC*

[⬆️ Back to Top](#-codequest--vault-edition)

</div>

---

## 🛠️ Quick Setup

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works great)
- Git

### Environment Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/induwarauthsara/codequest25-IEEEtask.git
   cd codequest25-IEEEtask
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

4. **Set up Supabase database:**
   - Follow the detailed guide in `SUPABASE_SETUP.md`
   - Run the SQL schema from `supabase-schema.sql`

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Start hacking! 🚀

### Quick Database Setup
Run this SQL in your Supabase SQL Editor:
```sql
-- Copy and paste the entire content from supabase-schema.sql
-- This will create all necessary tables and security policies
```

---

## 🗺️ Development Roadmap

### 🎯 Phase 1: CTF Challenge Integration
- [ ] **Pre-Registration CTF Challenge**
  - Simple web-based CTF challenge before team registration
  - Flag submission system for qualification
  - Challenge validation and feedback

### 👥 Phase 2: Team Registration System
- [ ] **Team Registration Portal**
  - Team leader registration with member details
  - Team member invitation system
  - Registration validation and confirmation
  - Team profile management

### � Phase 3: Admin Dashboard
- [ ] **Admin Authentication System**
  - Hardcoded admin login for security
  - Role-based access control
  - Session management

- [ ] **Admin Dashboard Features**
  - View all registered teams
  - Team details and member information
  - Registration statistics and analytics
  - Team status management

### 🚀 Phase 4: Enhanced Features
- [ ] **Supabase Integration**
  - Database setup for teams and challenges
  - Real-time data synchronization
  - Authentication middleware
- [ ] **Advanced CTF Features**
  - Multiple challenge categories
  - Leaderboard system
  - Real-time scoring

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS, Custom CSS Animations |
| **Backend** | Supabase (Planned) |
| **Database** | PostgreSQL via Supabase (Planned) |
| **Authentication** | Supabase Auth (Planned) |
| **Deployment** | Vercel |
| **Icons** | Lucide React |
| **Fonts** | Orbitron, Source Code Pro |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm package manager
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/induwarauthsara/codequest25-IEEEtask.git
cd codequest25-IEEEtask
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build && npm start
# or
yarn build && yarn start
# or
pnpm build && pnpm start
```

---

## 📁 Project Structure

```
codequest25-IEEEtask/
├── 📁 public/
│   └── favicon.svg
├── 📁 src/
│   ├── 📁 components/
│   │   ├── CustomCursor.tsx      # Cyberpunk cursor effect
│   │   ├── CyberGrid.tsx         # Grid background pattern
│   │   ├── EasterEggModal.tsx    # Hidden easter egg feature
│   │   ├── FAQItem.tsx           # Expandable FAQ component
│   │   ├── GlitchButton.tsx      # Animated glitch buttons
│   │   ├── LoadingScreen.tsx     # Initial loading animation
│   │   ├── MatrixRain.tsx        # Matrix digital rain effect
│   │   ├── PrizeCard.tsx         # Prize display cards
│   │   ├── TeamCard.tsx          # Team member cards
│   │   ├── TimelineItem.tsx      # Event timeline components
│   │   └── TypingText.tsx        # Typewriter text effect
│   ├── 📁 pages/
│   │   ├── _app.tsx              # Next.js App wrapper
│   │   ├── _document.tsx         # Custom document structure
│   │   └── index.tsx             # Main landing page
│   └── index.css                 # Global styles & animations
├── 📄 Configuration Files
│   ├── eslint.config.js
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
└── 📄 README.md
```

---

## 🎨 Design System

### Color Palette
- **Primary Red**: `#ef4444` (Cyber red)
- **Background**: `#000000` (Deep black)
- **Accent**: `#1f2937` (Dark gray)
- **Text**: `#ffffff` (Pure white)
- **Glow**: `#fecaca` (Soft red glow)

### Typography
- **Headers**: Orbitron (Futuristic, geometric)
- **Body**: Source Code Pro (Monospace, code-like)

### Animations
- Matrix rain effect
- Glitch transitions
- Typing animations
- Smooth scroll reveals
- Hover glow effects

---

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Next.js)
3. Deploy with automatic CI/CD

### Alternative Platforms
- **Netlify**: Full Next.js support
- **AWS Amplify**: Scalable hosting
- **Railway**: Simple deployment
- **DigitalOcean App Platform**: Managed hosting

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📋 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Component-based architecture
- Meaningful commit messages

### Performance
- Optimize images and assets
- Use Next.js Image optimization
- Implement lazy loading
- Minimize bundle size

---

## � Known Issues & Fixes

- **Matrix Rain Performance**: Optimized with `requestAnimationFrame`
- **Mobile Responsiveness**: Tested across all device sizes
- **Browser Compatibility**: Supports modern browsers (Chrome 90+, Firefox 88+, Safari 14+)

---

## 📞 Support & Contact

**IEEE Student Branch UCSC**
- 🌐 Website: [ieee.ucsc.cmb.ac.lk](https://ieee.ucsc.cmb.ac.lk)
- 📧 Email: ieee@ucsc.cmb.ac.lk
- 📱 Discord: [Join our community](https://discord.gg/ucsc-ieee)

---

## 📄 License

© 2025 IEEE Student Branch UCSC | All Rights Reserved

---

<div align="center">

**🔐 System Status: OPERATIONAL | Security Level: MAXIMUM**

![Built with Love](https://img.shields.io/badge/Built%20with-❤️-red?style=for-the-badge)
![IEEE UCSC](https://img.shields.io/badge/IEEE-UCSC-blue?style=for-the-badge)

</div>
