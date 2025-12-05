# Flag Skool AI Landing Page - Project Context

> **Last Updated**: 2025-12-05 - Schema/form options aligned to spec; consent text fixed; .env.example added
> 
> **Purpose**: This document serves as the single source of truth for all agents working on this project. All agents MUST read this before starting work and MUST update it when completing tasks.

---

## Project Overview

**Project Name**: Flag Skool AI Landing Page  
**Purpose**: Landing page for a 2026 masterclass on AI Automation & Engineering  
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui  
**Backend**: Google Sheets (via Google Apps Script webhook)  
**Status**: In Development

---

## Current Project State

### ✅ Completed Components

#### Landing Page Structure (`src/pages/Index.tsx`)
- **Navbar** (`src/components/landing/Navbar.tsx`): Fixed header with "Join Waitlist" button that scrolls to waitlist section
- **HeroSection** (`src/components/landing/HeroSection.tsx`): Main hero with simple email form that redirects to `/waitlist`
- **StackSection** (`src/components/landing/StackSection.tsx`): Displays 5 tools (n8n, Vapi, Cursor, Google AI Studio, ElevenLabs)
- **CurriculumGrid** (`src/components/landing/CurriculumGrid.tsx`): 4 curriculum items (AI Automation, Voice Agents, Coding with AI, Content Engines)
- **BenefitsSection** (`src/components/landing/BenefitsSection.tsx`): 3 benefits cards
- **VideoSection** (`src/components/landing/VideoSection.tsx`): Video player section (uses placeholder video)
- **FinalCTA** (`src/components/landing/FinalCTA.tsx`): Bottom CTA with waitlist form
- **Footer** (`src/components/landing/Footer.tsx`): Footer with social links (Twitter, LinkedIn, YouTube)

#### Waitlist System
- **WaitlistPage** (`src/pages/Waitlist.tsx`): Full form page with all sections implemented
  - Contact Info section (fullName, email, whatsapp, linkedin)
  - Skill Assessment section (profession, aiKnowledge, toolsUsed)
  - Hardware section (computerType, specs)
  - Goals section (primaryGoal, specificOutcome)
  - Consent checkbox
  - Form validation with react-hook-form + zod
  - Success state with WaitlistSuccess component
  - Error handling with toast notifications

- **WaitlistForm** (`src/components/landing/WaitlistForm.tsx`): Simple email form component used in HeroSection and FinalCTA
  - Currently redirects to `/waitlist` page
  - Accepts `variant` prop ("hero" | "footer")

- **WaitlistSuccess** (`src/components/landing/WaitlistSuccess.tsx`): Success message component
  - Shows checkmark icon
  - "You're on the list!" message
  - Optional "Submit Another Response" button

#### Form Schema (`src/lib/waitlist-schema.ts`)
- ✅ Schema values now match spec (aiKnowledge, computerType, primaryGoal, toolsUsed). Consent message references community code of conduct.

#### API Service (`src/lib/api/waitlist.ts`)
- Function: `submitWaitlistForm(data: WaitlistFormData)`
- POSTs to `/api/submit-waitlist` (serverless proxy -> `N8N_WEBHOOK_URL`)
- Returns `WaitlistResponse` with success/error states
- Handles errors and throws appropriate messages

#### Backend/Database
- **Google Apps Script** (`docs/google-apps-script.js`): Complete webhook handler
  - `doPost(e)` function handles POST requests
  - Validates required fields
  - Writes to Google Sheet with proper headers
  - Returns JSON responses
  - Includes test function `testDoPost()`
  - ⚠️ May need updates to match final schema values

- **Setup Documentation** (`docs/SETUP.md`): Complete setup guide for Google Sheets integration

### ⚠️ Issues & Required Updates

1. **Environment Variables**: `.env` needs the live webhook URL. Serverless proxy uses `N8N_WEBHOOK_URL`; optional `VITE_GOOGLE_SHEETS_WEBHOOK_URL` if submitting directly from client. `.env.example` added with placeholders.
2. **Google Sheet**: Not set up yet - Database Agent needs to create and deploy

### 📁 File Structure

```
src/
├── components/
│   └── landing/
│       ├── Navbar.tsx ✅
│       ├── HeroSection.tsx ✅
│       ├── StackSection.tsx ✅
│       ├── CurriculumGrid.tsx ✅
│       ├── BenefitsSection.tsx ✅
│       ├── VideoSection.tsx ✅
│       ├── FinalCTA.tsx ✅
│       ├── Footer.tsx ✅
│       ├── WaitlistForm.tsx ✅ (redirects to /waitlist)
│       └── WaitlistSuccess.tsx ✅
├── pages/
│   ├── Index.tsx ✅
│   ├── Waitlist.tsx ✅ (full form - needs schema updates)
│   └── NotFound.tsx ✅
├── lib/
│   ├── api/
│   │   └── waitlist.ts ✅
│   ├── waitlist-schema.ts ✅ (values match spec)
│   └── utils.ts ✅
├── hooks/
│   └── use-toast.ts ✅
└── App.tsx ✅ (routes configured)

docs/
├── google-apps-script.js ✅ (may need updates)
└── SETUP.md ✅

.env ❌ (create locally with webhook URL)
.env.example ✅ (added)
```

---

## Agent Responsibilities

### Frontend Agent
**Status (2025-12-05)**: Schema enums, form labels/options, and consent text updated to spec.

**Files Modified**:
- `src/lib/waitlist-schema.ts`
- `src/pages/Waitlist.tsx`

**Testing Checklist**:
- [ ] All form fields validate correctly
- [ ] Error messages display below fields
- [ ] Form submits successfully
- [ ] Success state displays correctly
- [ ] Error toast shows on failure

### Backend Agent
**Status (2025-12-05)**: `.env.example` added with `N8N_WEBHOOK_URL` placeholder used by `/api/submit-waitlist` proxy. Create local `.env` with the live URL. Google Apps Script unchanged.

**Files to Create/Modify**:
- `.env` (local only; add `N8N_WEBHOOK_URL`)
- `.env.example` (added)
- `docs/google-apps-script.js` (update if needed)

**Environment Variables**:
```
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
# Optional if using direct client submit:
# VITE_GOOGLE_SHEETS_WEBHOOK_URL=your_google_apps_script_webhook_here
```

**Testing Checklist**:
- [ ] Webhook URL is accessible
- [ ] Webhook returns proper JSON responses
- [ ] Error handling works with invalid data
- [ ] Environment variable loads correctly

### Database Agent
**Tasks**:
1. Create Google Sheet with proper headers
2. Deploy Google Apps Script (using code from `docs/google-apps-script.js`)
3. Get webhook URL and share with Backend Agent
4. Test end-to-end data flow

**Google Sheet Headers** (Row 1):
```
Timestamp | Full Name | Email | WhatsApp | LinkedIn | Profession | AI Knowledge | Tools Used | Computer Type | Specs | Primary Goal | Specific Outcome | Consent
```

**Deployment Steps** (see `docs/SETUP.md` for details):
1. Create Google Sheet
2. Open Extensions → Apps Script
3. Paste code from `docs/google-apps-script.js`
4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
5. Copy webhook URL
6. Share URL with Backend Agent

**Testing Checklist**:
- [ ] Sheet created with correct headers
- [ ] Script deployed successfully
- [ ] Test submission appears in sheet
- [ ] All columns populated correctly
- [ ] Timestamp formats correctly
- [ ] Array fields (toolsUsed) join properly

---

## Form Specification (Required Values)

### Contact Info Section
- **fullName**: Text, Required, Label "Full Name"
- **email**: Email, Required, Label "Email Address"
- **whatsapp**: Tel, Required, Label "WhatsApp Number"
- **linkedin**: URL, Optional, Label "LinkedIn Profile (Optional)"

### Skill Assessment Section
- **profession**: Text, Required, Label "Current Role/Profession"
- **aiKnowledge**: Select Dropdown, Required, Options:
  - "Complete Beginner"
  - "I've used ChatGPT"
  - "I use AI tools daily"
  - "Advanced/Developer"
- **toolsUsed**: Checkbox Group, Label "Which tools have you tried?", Options:
  - "ChatGPT/Claude"
  - "Midjourney/DALL-E"
  - "n8n/Automation"
  - "Stable Diffusion"
  - "None"

### Hardware & Logistics Section
- **computerType**: Select Dropdown, Required, Label "What computer will you use?", Options:
  - "Mac"
  - "Windows"
  - "Linux"
  - "Tablet/Mobile"
- **specs**: Text, Optional, Label "Computer Specs (RAM/GPU) - Optional"

### Goals Section
- **primaryGoal**: Radio Group, Required, Label "Primary Goal", Options:
  - "Upskilling for Job"
  - "Starting an Agency/Business"
  - "Personal Project"
  - "Just Curious"
- **specificOutcome**: Textarea, Required, Label "What is one specific thing you want to create or learn?"

### Submission Section
- **consent**: Checkbox, Required, Label "I agree to the community code of conduct."
- **Submit Button**: Full width, bold text "Secure My Spot", Show "Submitting..." loading state

---

## Technical Details

### Dependencies (All Installed)
- React 18.3.1
- TypeScript 5.8.3
- Vite 5.4.19
- Tailwind CSS 3.4.17
- react-hook-form 7.61.1
- zod 3.25.76
- @hookform/resolvers 3.10.0
- All shadcn/ui components

### Routing
- `/` - Landing page (Index.tsx)
- `/waitlist` - Full waitlist form page
- `*` - 404 page (NotFound.tsx)

### Design System
- Font: Inter (from Google Fonts)
- Primary Color: `hsl(234 89% 59%)` (blue)
- Uses CSS variables for theming
- Responsive design with Tailwind breakpoints

### Form Flow
1. User clicks "Join Waitlist" in Navbar or HeroSection
2. Simple email form redirects to `/waitlist` page
3. User fills out full form
4. Form validates with zod schema
5. On submit: POST to Google Sheets webhook
6. On success: Show WaitlistSuccess component
7. On error: Show toast notification

---

## Agent Update Protocol

**When completing a task, agents MUST**:
1. Update the "Last Updated" timestamp at the top
2. Mark completed items with ✅
3. Update status of files modified
4. Add notes about any changes made
5. Update testing checklists with completion status

**Example Update**:
```markdown
> **Last Updated**: 2025-01-XX - Frontend Agent completed schema updates

### ✅ Completed Components
- waitlist-schema.ts ✅ (Updated enum values to match spec)
```

---

## CORS Troubleshooting

**If you encounter CORS errors when submitting the form:**

1. **Verify Google Apps Script Deployment Settings:**
   - Go to Apps Script editor → Deploy → Manage deployments
   - Click the pencil icon ✏️ next to your deployment
   - Ensure "Who has access" is set to **"Anyone"** (NOT "Anyone with Google account")
   - Ensure "Execute as" is set to **"Me"**
   - Click "Deploy" to save changes

2. **Redeploy After Changes:**
   - After updating the script, you MUST create a new deployment version
   - Go to Deploy → Manage deployments → Edit → New version → Deploy
   - The webhook URL stays the same

3. **Check Webhook URL:**
   - Verify the URL in `.env` matches the deployed web app URL exactly
   - Test the URL directly in browser (should return JSON)
   - Restart dev server after updating `.env`

4. **Verify Permissions:**
   - Make sure you authorized the script when first deploying
   - Check Apps Script → Executions for any permission errors

## Questions & Notes

- Form placement: Currently redirects to `/waitlist` page - this is working as intended
- Google Sheets webhook URL: Will be provided by Database Agent after deployment
- Environment variables: Backend Agent will create `.env` structure
- Schema updates: Frontend Agent needs to align all enum values with spec
- CORS: Google Apps Script handles CORS automatically when deployed with "Anyone" access

---

## Next Steps

1. Backend Agent: Add real webhook URL to `.env`; confirm proxy works
2. Database Agent: Set up Google Sheet and deploy script
3. All Agents: Test end-to-end flow
4. Final verification: Ensure all form fields match spec requirements

