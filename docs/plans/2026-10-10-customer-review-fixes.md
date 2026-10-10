# Customer Review Implementation Plan (Scoped)

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Address scoped customer review items across Home, About, Contact, Programs, and Teams, maintaining strict < 100 lines/file, zero inline styles, zero hardcoded colors, and complete TypeScript type safety. (Skipping: Madam Hedwig addition and News/Events changes as requested).

**Architecture:**
1. **Home:** Expand humanitarian acronyms (MHPSS, PSEA) and add official external links to strategic partners.
2. **About:** Diversify repetitive "grassroots" mentions across text and datasets using context-appropriate synonyms.
3. **Contact:** Support email dispatch via Resend/SMTP when configured + instant client mailto fallback to `contact@nimo.africa`.
4. **Programs:** Add an "All Programs Overview" dashboard at `/programs` and deep dives for `/programs?id=[slug]`.
5. **Teams:** Programmatically pre-fill team member name and role in inquiry emails (`mailto:`).

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, Supabase.

---

### Task 1: Home Page — Acronym Expansions (MHPSS & PSEA) & Strategic Partner Links
- Files: `src/data/data.json`, `src/types/index.ts`, `src/components/home/PartnerSlideCard.tsx`

### Task 2: About Us — Vary "Grassroots" with Professional Synonyms
- Files: `src/data/aboutData.json`, `src/components/about/AboutHero.tsx`, `src/components/about/AboutOverviewSection.tsx`, `src/components/about/AboutApproachSection.tsx`, `src/components/about/AboutFootprintSection.tsx`, `src/components/about/StaffCapacities.tsx`

### Task 3: Contact Form — Email Delivery Pipeline & Mailto Fallback
- Files: `src/lib/services/emailService.ts`, `src/app/api/contact/route.ts`, `src/components/contact/ContactForm.tsx`

### Task 4: Programs Page — General Overview for `/programs` vs Deep-Dive for `/programs?id=...`
- Files: `src/components/programs/ProgramsOverviewGrid.tsx`, `src/components/programs/ProgramView.tsx`, `src/data/programsNavigation.json`

### Task 5: Teams — Programmatic Email Subject/Body on Contact CTAs
- Files: `src/components/team/TeamMemberCard.tsx`

### Task 6: Verification & Quality Assurance
- Line count check (< 100 lines on 100% of files)
- `npx tsc --noEmit` & `npm run lint` & `npm run build`
- Git commit & push
