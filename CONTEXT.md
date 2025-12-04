# Flag Skool AI Landing Page - Project Context

> **Last Updated**: 2025-01-XX - Initial context document created
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
**CURRENT STATE** - ⚠️ NEEDS UPDATES TO MATCH SPEC:
```typescript
- fullName: string (min 2 chars) ✅
- email: email validation ✅
- whatsapp: string (min 10 chars) ✅
- linkedin: URL (optional) ✅
- profession: string (min 2 chars) ✅
- aiKnowledge: enum ["beginner", "intermediate", "advanced"] ❌ WRONG VALUES
- toolsUsed: array of strings (min 1) ✅ (but wrong options)
- computerType: enum ["windows", "mac", "linux", "other"] ❌ WRONG VALUES
- specs: string (optional) ✅
- primaryGoal: enum ["voice-agents", "chatbots", "content-workflows", "all"] ❌ WRONG VALUES
- specificOutcome: string (min 10 chars) ✅
- consent: boolean (must be true) ✅
```

**REQUIRED VALUES** (from spec):
- `aiKnowledge`: `["Complete Beginner", "I've used ChatGPT", "I use AI tools daily", "Advanced/Developer"]`
- `computerType`: `["Mac", "Windows", "Linux", "Tablet/Mobile"]`
- `primaryGoal`: `["Upskilling for Job", "Starting an Agency/Business", "Personal Project", "Just Curious"]`
- `toolsUsed`: Options should be `["ChatGPT/Claude", "Midjourney/DALL-E", "n8n/Automation", "Stable Diffusion", "None"]`
- `consent`: Message should say "community code of conduct" not "terms and conditions"

#### API Service (`src/lib/api/waitlist.ts`)
- Function: `submitWaitlistForm(data: WaitlistFormData)`
- POSTs to `import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL`
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

1. **Schema Mismatch**: `waitlist-schema.ts` has wrong enum values - needs update to match spec
2. **Form Labels**: `Waitlist.tsx` has wrong labels/options - needs update
3. **Consent Text**: Says "terms and conditions" should say "community code of conduct"
4. **Environment Variables**: `.env` file doesn't exist yet - needs to be created
5. **Google Sheet**: Not set up yet - Database Agent needs to create and deploy

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
│   ├── waitlist-schema.ts ⚠️ (needs enum value updates)
│   └── utils.ts ✅
├── hooks/
│   └── use-toast.ts ✅
└── App.tsx ✅ (routes configured)

docs/
├── google-apps-script.js ✅ (may need updates)
└── SETUP.md ✅

.env ❌ (doesn't exist - needs creation)
.env.example ❌ (doesn't exist - needs creation)
```

---

## Agent Responsibilities

### Frontend Agent
**Tasks**:
1. Update `waitlist-schema.ts` with correct enum values matching spec
2. Update `Waitlist.tsx` form labels and options to match spec
3. Update consent checkbox text to "community code of conduct"
4. Ensure form validation works correctly
5. Test form submission flow

**Files to Modify**:
- `src/lib/waitlist-schema.ts`
- `src/pages/Waitlist.tsx`

**Testing Checklist**:
- [ ] All form fields validate correctly
- [ ] Error messages display below fields
- [ ] Form submits successfully
- [ ] Success state displays correctly
- [ ] Error toast shows on failure

### Backend Agent
**Tasks**:
1. Create `.env` file structure
2. Create `.env.example` template
3. Update Google Apps Script if needed to match final schema
4. Ensure webhook handles all form fields correctly

**Files to Create/Modify**:
- `.env` (create)
- `.env.example` (create)
- `docs/google-apps-script.js` (update if needed)

**Environment Variable**:
```
VITE_GOOGLE_SHEETS_WEBHOOK_URL=your_webhook_url_here
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

1. Frontend Agent: Update schema and form to match spec exactly
2. Backend Agent: Create environment variable files
3. Database Agent: Set up Google Sheet and deploy script
4. All Agents: Test end-to-end flow
5. Final verification: Ensure all form fields match spec requirements

