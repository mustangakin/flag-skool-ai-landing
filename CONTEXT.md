# Flag Skool AI Landing Page - Project Context

> **Last Updated**: 2025-12-06 - Complete codebase audit and restructure. Removed antd/lobehub dependencies, added local tool logos, mobile hamburger menu, new pages (Curriculum, Benefits, Pricing).
> 
> **Purpose**: This document serves as the single source of truth for all agents and developers working on this project.

---

## Project Overview

| Field | Value |
|-------|-------|
| **Project Name** | Flag Skool AI Landing Page |
| **Purpose** | Landing page for a 2026 masterclass on AI Automation & Engineering |
| **Tech Stack** | React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| **Backend** | Vercel Serverless → n8n Webhook → Google Sheets |
| **Deployment** | Vercel |
| **Status** | ✅ Production Ready |

---

## Current Project State

### ✅ Core Features

#### Theme System
- **Dark/Light Mode**: Fully implemented with `next-themes`
- **Primary Color**: Red (`hsl(0 84% 50%)` / `#ef4444`)
- **Font**: Inter (Google Fonts)
- **Theme Toggle**: Dropdown with Light/Dark/System options

#### Navigation
- **Navbar** (`src/components/landing/Navbar.tsx`)
  - Fixed header with glassmorphism effect
  - Logo with fallback
  - Desktop nav links: Curriculum, Benefits, Pricing
  - Mobile hamburger menu (< 768px)
  - Theme toggle
  - Join Waitlist CTA button

#### Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Index.tsx` | Main landing page with all sections |
| `/waitlist` | `Waitlist.tsx` | Full waitlist form with validation |
| `/curriculum` | `Curriculum.tsx` | 8-week program curriculum details |
| `/benefits` | `Benefits.tsx` | Why choose Flag Skool + testimonials |
| `/pricing` | `Pricing.tsx` | 3 pricing tiers + FAQs |
| `*` | `NotFound.tsx` | 404 fallback page |

#### Landing Page Sections (Index.tsx)
1. **HeroSection** - Theme-based background, countdown timer, email form
2. **VideoSection** - Embedded video player
3. **StackSection** - 12 tool logos in infinite scroll carousel
4. **CurriculumGrid** - 4 curriculum highlights
5. **BenefitsSection** - 3 key benefits cards
6. **FinalCTA** - Bottom call-to-action with email form
7. **Footer** - Copyright + social links

### ✅ Tool Logos (StackSection)

All logos are local files in `/public/logos/` - no external CDN dependencies.

| Tool | File | Format |
|------|------|--------|
| n8n | `n8n-logo.png` | PNG |
| Vapi | `vapi-logo.svg` | SVG |
| Cursor | `cursor-logo.svg` | SVG |
| Gemini | `gemini-color.png` | PNG |
| ChatGPT | `openai.svg` | SVG |
| ElevenLabs | `elevenlabs.svg` | SVG |
| OpenRouter | `openrouter-logo-light.png` / `openrouter-logo-dark.png` | PNG (theme-aware) |
| Google | `google-color.svg` | SVG |
| Google Cloud | `googlecloud-color.svg` | SVG |
| Lovable | `lovable-color.svg` | SVG |
| Tavily | `tavily-logo.svg` | SVG |
| Replit | `replit-logo.svg` | SVG |

### ✅ Waitlist System

#### Form Schema (`src/lib/waitlist-schema.ts`)

**Contact Info:**
- `fullName` - Required, min 2 chars
- `email` - Required, valid email
- `whatsapp` - Required, min 10 digits
- `linkedin` - Optional, valid URL

**Skill Assessment:**
- `profession` - Required, min 2 chars
- `aiKnowledge` - Enum: "Complete Beginner" | "I've used ChatGPT" | "I use AI tools daily" | "Advanced/Developer"
- `toolsUsed` - Array of: "ChatGPT/Claude" | "Midjourney/DALL-E" | "n8n/Automation" | "Stable Diffusion" | "None"

**Hardware:**
- `computerType` - Enum: "Mac" | "Windows" | "Linux" | "Tablet/Mobile"
- `specs` - Optional

**Goals:**
- `primaryGoal` - Enum: "Upskilling for Job" | "Starting an Agency/Business" | "Personal Project" | "Just Curious"
- `specificOutcome` - Required, min 10 chars

**Consent:**
- `consent` - Required boolean, must be true

#### API Flow
1. Frontend submits to `/api/submit-waitlist`
2. Vercel serverless function proxies to n8n webhook
3. n8n processes and writes to Google Sheet

---

## File Structure

```
flag-skool-ai-landing/
├── api/
│   └── submit-waitlist/
│       └── index.ts              # Vercel serverless function
├── docs/
│   ├── google-apps-script.js     # Google Sheets webhook (legacy)
│   └── SETUP.md                  # Setup documentation
├── public/
│   ├── favicon.ico
│   ├── hero-bg-dark.jpg          # Dark theme hero background
│   ├── hero-bg-light.jpg         # Light theme hero background
│   ├── logo.png                  # Flag Skool logo
│   └── logos/                    # Tool logos (12 files)
├── src/
│   ├── components/
│   │   ├── landing/              # Landing page sections
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── CurriculumGrid.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Navbar.tsx        # With mobile hamburger menu
│   │   │   ├── StackSection.tsx  # Tool logos carousel
│   │   │   ├── VideoSection.tsx
│   │   │   ├── WaitlistForm.tsx
│   │   │   └── WaitlistSuccess.tsx
│   │   ├── ui/                   # shadcn/ui components (50+ files)
│   │   ├── CookieBanner.tsx
│   │   ├── CountdownTimer.tsx
│   │   ├── NavLink.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── api/
│   │   │   └── waitlist.ts       # API submission function
│   │   ├── utils.ts              # Utility functions (cn)
│   │   └── waitlist-schema.ts    # Zod validation schema
│   ├── pages/
│   │   ├── Benefits.tsx
│   │   ├── Curriculum.tsx
│   │   ├── Index.tsx             # Main landing page
│   │   ├── NotFound.tsx
│   │   ├── Pricing.tsx
│   │   └── Waitlist.tsx
│   ├── App.tsx                   # Routes + providers
│   ├── index.css                 # Global styles + CSS variables
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts
├── CONTEXT.md                    # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## Dependencies

### Production (Key Packages)

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI framework |
| react-router-dom | ^6.30.1 | Client-side routing |
| next-themes | ^0.3.0 | Theme management |
| react-hook-form | ^7.61.1 | Form handling |
| zod | ^3.25.76 | Schema validation |
| @hookform/resolvers | ^3.10.0 | Zod + react-hook-form |
| framer-motion | ^12.23.25 | Animations |
| lucide-react | ^0.462.0 | Icons |
| tailwind-merge | ^2.6.0 | Class merging |
| class-variance-authority | ^0.7.1 | Variant styling |
| react-countup | ^6.5.3 | Animated counters |
| react-intersection-observer | ^10.0.0 | Scroll animations |
| react-parallax-tilt | ^1.7.314 | Card tilt effects |
| react-cookie-consent | ^9.0.0 | Cookie banner |
| sonner | ^1.7.4 | Toast notifications |
| react-hot-toast | ^2.6.0 | Toast notifications |

### Removed Packages (Dec 6, 2025)
- ❌ `@lobehub/icons` - Caused React 19 peer dependency conflicts
- ❌ `antd` - Heavy dependency, not needed
- ❌ `@tsparticles/*` - Particles removed from hero
- ❌ `react-particles` - Particles removed

**Result**: Package count reduced from 1,015 → 477

---

## Environment Variables

```bash
# .env (create locally)
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
```

The serverless function at `/api/submit-waitlist` uses this to proxy form submissions.

---

## Design System

### Colors (CSS Variables)

```css
/* Light Mode */
--primary: 0 84% 50%;           /* Red #ef4444 */
--background: 0 0% 100%;        /* White */
--foreground: 215 25% 15%;      /* Dark gray */
--card: 0 0% 100%;              /* White */
--muted: 0 0% 96%;              /* Light gray */
--border: 0 0% 91%;             /* Border gray */

/* Dark Mode */
--background: 215 25% 10%;      /* Dark blue-gray */
--foreground: 0 0% 98%;         /* Near white */
--card: 215 25% 12%;            /* Slightly lighter */
--muted: 215 25% 15%;           /* Muted dark */
--border: 215 25% 20%;          /* Dark border */
```

### Typography
- **Font**: Inter (400, 500, 600, 700)
- **Scale**: Tailwind defaults + custom sizing

### Breakpoints
- `sm`: 640px
- `md`: 768px (hamburger menu breakpoint)
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1400px (container max)

---

## Routing

```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/waitlist" element={<Waitlist />} />
  <Route path="/curriculum" element={<Curriculum />} />
  <Route path="/benefits" element={<Benefits />} />
  <Route path="/pricing" element={<Pricing />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## App Providers (App.tsx)

```tsx
<ThemeProvider>           {/* Dark/light mode */}
  <QueryClientProvider>   {/* React Query */}
    <TooltipProvider>     {/* Tooltips */}
      <Toaster />         {/* shadcn toasts */}
      <Sonner />          {/* Sonner toasts */}
      <HotToaster />      {/* react-hot-toast */}
      <BrowserRouter>
        <Routes />
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
</ThemeProvider>
```

---

## Development

### Commands

```bash
npm run dev       # Start dev server (port 8080)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Local Development
1. Clone repository
2. Run `npm install`
3. Create `.env` with `N8N_WEBHOOK_URL`
4. Run `npm run dev`
5. Open http://localhost:8080

---

## Deployment (Vercel)

### Configuration (vercel.json)
- Rewrites `/api/*` to serverless functions
- SPA fallback to index.html
- Headers for caching

### Auto-Deploy
- Push to `main` branch triggers deployment
- Environment variables set in Vercel dashboard

---

## Testing Checklist

### Landing Page
- [ ] Hero section renders with correct theme background
- [ ] Countdown timer updates every second
- [ ] Tool logos carousel scrolls infinitely
- [ ] All navigation links work
- [ ] Mobile hamburger menu opens/closes
- [ ] Theme toggle switches between light/dark/system
- [ ] Email form redirects to /waitlist

### Waitlist Form
- [ ] All fields validate correctly
- [ ] Error messages display below fields
- [ ] Form submits successfully
- [ ] Success state displays correctly
- [ ] Error toast shows on failure

### Responsive Design
- [ ] Desktop (1280px+): Full nav links visible
- [ ] Tablet (768-1279px): Nav links visible
- [ ] Mobile (<768px): Hamburger menu visible

---

## Recent Changes (Dec 6, 2025)

### Removed
- ❌ Particles background from HeroSection
- ❌ `@lobehub/icons` package (React 19 conflicts)
- ❌ `antd` package (unnecessary)
- ❌ `@tsparticles/*` packages

### Added
- ✅ Local tool logos (12 SVG/PNG files)
- ✅ Theme-aware OpenRouter logo (light/dark variants)
- ✅ Mobile hamburger menu in Navbar
- ✅ Curriculum page with 4 modules
- ✅ Benefits page with 6 benefits + testimonials
- ✅ Pricing page with 3 tiers + FAQs
- ✅ Replit added to tool stack

### Fixed
- ✅ Vercel deployment peer dependency conflicts
- ✅ Package count optimized (1015 → 477)

---

## Notes

- **Cookie Banner**: Links to `/privacy` (page not yet created)
- **Social Links**: Footer links are placeholder `#` hrefs
- **Video**: Uses Pexels stock video URL
- **Testimonials**: Placeholder content on Benefits page
- **Pricing**: Early bird pricing with January 2025 cohort date (update needed)

---

## Contact

For questions about this project, refer to this document first. Keep it updated with any changes made to the codebase.
