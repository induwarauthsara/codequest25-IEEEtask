# 🚀 CodeQuest – Vault Edition

<div align="center">

![CodeQuest Banner](https://img.shields.io/badge/CodeQuest-Vault%20Edition-red?style=for-the-badge&logo=hackthebox&logoColor=white)
<br/>
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

**The Official Web Platform for CodeQuest CTF Hackathon**  
*Organized by IEEE Student Branch of UCSC*

[🔗 Live Demo](https://codequest25-ieee-task.vercel.app)

</div>

---

## 🎯 About

CodeQuest – Vault Edition is a full-stack web platform for the IEEE UCSC CTF hackathon featuring a cybersecurity-themed interface with hacker aesthetics, complete CTF challenge system, team registration, and admin dashboard.

---

## ✨ Key Features

- **🍪 Cookie-Based CTF Challenge** - Solve the pre-registration challenge hidden in browser cookies
- **👥 Team Registration** - Complete registration system with 1-4 member teams
- **🔐 Admin Dashboard** - Team management, security logs, and CSV export
- **🛡️ Security Audit Logging** - Comprehensive activity tracking with risk assessment
- **🎨 Cyberpunk UI** - Matrix rain, glitch effects, and neon hacker theme
- **⚡ Modern Stack** - Next.js 15, React 19, TypeScript, Supabase

---

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- Supabase account

### Installation
```bash
# Clone repository
git clone https://github.com/induwarauthsara/codequest25-IEEEtask.git
cd codequest25-IEEEtask

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

### Database Setup
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings → API
3. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
4. Update `.env.local` with your credentials

---

## 🎮 How to Use

### For Participants
1. **Solve Cookie Challenge**: Find the flag hidden in browser cookies (`hidden_treasure`)
2. **Register Team**: Complete team registration form after solving challenge
3. **Easter Egg**: Type "help" anywhere for hints

### For Admins
1. Navigate to `/registration?admin=true`
2. Login with: `admin` / `codequest2025admin`  (you can change this in the `.env.local` file)
3. Manage teams and view security logs

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Next.js API Routes
- **Deployment**: Vercel
- **Features**: Real-time database, authentication, file storage

---

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CTFChallenge.tsx    # Cookie-based challenge
│   ├── TeamRegistration.tsx # Registration form
│   ├── AdminDashboard.tsx   # Admin panel
│   └── [UI components]      # Matrix, Glitch, etc.
├── pages/
│   ├── index.tsx           # Landing page
│   └── registration.tsx    # Registration flow
├── lib/
│   └── supabase.ts         # Database client
└── index.css              # Global styles

supabase-schema.sql         # Database schema
.env.example               # Environment template
```

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy

Environment variables needed:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 🙏 Acknowledgments

- **Induwara Uthsara** ([induwara.dev](https://induwara.dev)) - Full-Stack Developer
- **IEEE Student Branch UCSC** - Event organization and support
- **Supabase** - Database and authentication infrastructure
- **Vercel** - Hosting and deployment platform

---

<div align="center">

**Made with ❤️ for the cybersecurity community**

*CodeQuest – Vault Edition 2025*  
*IEEE Student Branch of UCSC*  
*Developed by [Induwara Uthsara](https://induwara.dev)*

</div>