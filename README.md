# CodeQuest - Vault Edition | Next.js Project

This is a **Next.js** version of the CodeQuest CTF Hackathon website, converted from the original Vite React application.

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🛠 What Changed in the Conversion

### From Vite to Next.js
- **Removed**: `vite.config.ts`, `index.html`, `src/main.tsx`, Vite-specific configurations
- **Added**: `next.config.js`, `src/pages/_app.tsx`, `src/pages/_document.tsx`, Next.js routing structure
- **Updated**: Build scripts, TypeScript configuration, ESLint configuration
- **Migrated**: Main App component → `src/pages/index.tsx`

### Project Structure
```
src/
  pages/
    _app.tsx      # Next.js App component
    _document.tsx # Next.js Document component  
    index.tsx     # Main landing page (converted from App.tsx)
  components/     # All React components (unchanged)
    ├── CustomCursor.tsx
    ├── CyberGrid.tsx
    ├── EasterEggModal.tsx
    ├── FAQItem.tsx
    ├── GlitchButton.tsx
    ├── LoadingScreen.tsx
    ├── MatrixRain.tsx
    ├── PrizeCard.tsx
    ├── TeamCard.tsx
    ├── TimelineItem.tsx
    └── TypingText.tsx
  index.css       # Global styles (unchanged)
public/           # Static assets
```

### Key Features Preserved
- ✅ All cyberpunk styling and animations
- ✅ Matrix rain background effect
- ✅ Custom cursor functionality
- ✅ Typing text animations
- ✅ Glitch button effects
- ✅ Timeline components
- ✅ Prize cards and team cards
- ✅ FAQ sections
- ✅ Easter egg modal (type "help")
- ✅ Responsive design
- ✅ Tailwind CSS styling

## 🔧 Configuration Files

### Updated for Next.js:
- `package.json` - Updated dependencies and scripts
- `tsconfig.json` - Next.js TypeScript configuration
- `eslint.config.js` - Next.js ESLint rules
- `tailwind.config.js` - Updated content paths for Next.js
- `postcss.config.js` - CommonJS format for Next.js compatibility
- `next.config.js` - Next.js configuration

## 🎨 Styling

The project uses:
- **Tailwind CSS** for utility-first styling
- **Custom CSS** with cyberpunk themes and animations
- **Google Fonts** (Orbitron and Source Code Pro)
- **Lucide React** for icons

## 🌟 Features

- Modern cyberpunk design
- Interactive animations and effects
- Responsive layout for all devices
- Easter egg functionality
- Loading screen animation
- Matrix-style background effects
- Custom cursor with cyber theme

## 🚀 Deployment

This Next.js project can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Node.js applications

### Vercel Deployment (Easiest)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📄 License

© 2025 IEEE Student Branch UCSC | All Rights Reserved

---

**System Status: OPERATIONAL | Security Level: MAXIMUM** 🔐
