# 🚀 CodeQuest – Vault Edition

<div align="center">

![CodeQuest Banner](https://img.shields.io/badge/CodeQuest-Vault%20Edition-red?style=for-the-badge&logo=hackthebox&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js&logoColor=white)
<!-- line break -->

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**The Official Web Platform for CodeQuest CTF Hackathon**  
*Organized by IEEE Student Branch of UCSC*

</div>

---

## 🎯 Project Description

CodeQuest – Vault Edition is the official web platform for the Capture the Flag (CTF) hackathon organized by the IEEE Student Branch of UCSC. Built with cutting-edge technology using **Next.js 15** and **React 19**, powered by **Supabase** for authentication and data management, and deployed on **Vercel** for global performance.

The platform embraces a **cybersecurity gaming atmosphere** with a red & black neon hacker theme, complete with glitch effects, animated timelines, and interactive UI components to give participants the feeling of stepping into a **cyber vault**.

---

## ⚡ Key Features (Current Build)

### 🎮 Single Page Experience (SPA)
- **Hero Section** with hacker-style animations and matrix rain effects
- **Introduction** with CTF overview and event highlights
- **Event Timeline** with animated scroll reveals and cyber-themed milestones
- **Prizes & Sponsors** section with glowing interactive cards
- **Team Section** with contact details and member profiles
- **FAQ Accordion** with cyber-inspired design and smooth animations

### 🚀 Performance & Technology
- ⚡ **Performance-first** using Turbopack build system
- 📱 **Fully responsive** design (mobile → desktop)
- 🌐 **Seamlessly hosted** on Vercel
- 🎨 **Custom animations** with Tailwind CSS and CSS modules
- 🔧 **TypeScript** for type safety and better development experience

### 🎪 Interactive Elements
- 🖱️ Custom cyberpunk cursor
- 💧 Matrix rain background effect
- ⚡ Glitch button animations
- ⌨️ Typing text effects
- 🎯 Easter egg modal (type "help")
- 🌟 Smooth scrolling and reveal animations

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
