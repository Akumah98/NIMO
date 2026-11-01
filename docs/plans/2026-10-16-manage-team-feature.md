# Manage Team Members Feature Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete Admin Team Management feature allowing administrators to view, add, edit, reorder, and delete team members, with changes instantly reflected in the public `/team` directory and graceful offline/empty fallback to local JSON.

**Architecture:**
1. **Data Layer (`supabase/migrations/` & `src/lib/services/teamService.ts`):** Create PostgreSQL `team_members` table with RLS policies, display ordering, and visibility toggle. A dedicated service layer handles all Supabase queries with seamless fallback to `src/data/teamData.json`.
2. **Domain Layer (`src/hooks/`):** Dedicated custom hooks `useAdminTeam` and `useTeamMemberForm` isolate all state management, validation, department filtering, and asynchronous mutation logic.
3. **Presentation Layer (`src/components/admin/team/` & `src/app/admin/team/`):** Modular Lego blocks composed of small focused sub-components (< 100 lines each): `TeamMemberTable`, `TeamDepartmentTabs`, `TeamMemberBasicFields`, `TeamMemberDetailsFields`, `TeamMemberContactFields`, and `TeamMemberForm`.
4. **Integration (`src/components/layout/AdminNavLinks.tsx`, `src/app/admin/page.tsx`, `src/app/team/page.tsx`):** Add Team link to admin navigation, add Team counters/quick action to dashboard, and connect the public Team page to dynamic service data.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 design tokens, Supabase PostgreSQL with RLS.

---

### Task 1: Database Migration & Team Member Type Extension
- **Files:**
  - Create: `supabase/migrations/003_team_members.sql`
  - Modify: `src/types/team.ts`
- **Steps:**
  1. Create `003_team_members.sql` defining `team_members` table (UUID, name, role, department, department_slug, location, image, bio, credentials text[], email, linkedin, display_order, visible, timestamps) with RLS policies and seed insert from current team data.
  2. Extend `TeamMember` interface in `src/types/team.ts` with `display_order?: number`, `visible?: boolean`, `created_at?: string`, `updated_at?: string`.
  3. Verify type correctness with `npx tsc --noEmit`.

---

### Task 2: Team Service Layer (`src/lib/services/teamService.ts`)
- **Files:**
  - Create: `src/lib/services/teamService.ts`
- **Steps:**
  1. Implement `fetchPublicTeamMembers()`: queries Supabase `team_members` where `visible = true` ordered by `display_order ASC`, falling back to `teamData.members` if the database table is empty or offline.
  2. Implement `fetchAdminTeamMembers()`: queries all team members ordered by `display_order ASC, created_at DESC`, with fallback support.
  3. Implement `getTeamMemberById(id: string)`: retrieves single member record.
  4. Implement `saveTeamMember(data, id?)`: performs insert or update against Supabase.
  5. Implement `deleteTeamMember(id: string)`: deletes member record.
  6. Implement `toggleTeamMemberVisibility(id: string, visible: boolean)`: updates status.
  7. Guarantee file size is < 100 lines.

---

### Task 3: Admin Custom Hooks (`useAdminTeam` & `useTeamMemberForm`)
- **Files:**
  - Create: `src/hooks/useAdminTeam.ts`
  - Create: `src/hooks/useTeamMemberForm.ts`
- **Steps:**
  1. Build `useAdminTeam.ts`: manages team member list, loading state, active department filter, delete confirmation, and visibility toggling. (< 90 lines)
  2. Build `useTeamMemberForm.ts`: manages controlled form fields (name, role, department, location, image, bio, credentials, email, linkedin, display_order, visible), handles validation, submits payload to `teamService`, and redirects to `/admin/team`. (< 95 lines)
  3. Verify type safety with `npx tsc --noEmit`.

---

### Task 4: Modular Admin Team Components (`src/components/admin/team/`)
- **Files:**
  - Create: `src/components/admin/team/TeamMemberTable.tsx`
  - Create: `src/components/admin/team/TeamDepartmentTabs.tsx`
  - Create: `src/components/admin/team/TeamMemberBasicFields.tsx`
  - Create: `src/components/admin/team/TeamMemberDetailsFields.tsx`
  - Create: `src/components/admin/team/TeamMemberContactFields.tsx`
  - Create: `src/components/admin/team/TeamMemberForm.tsx`
- **Steps:**
  1. Build `TeamDepartmentTabs.tsx` (< 60 lines) for filtering team members by department.
  2. Build `TeamMemberTable.tsx` (< 95 lines) displaying photo avatar, full name, role, department badge, location, visibility badge, and Edit/Delete action buttons.
  3. Build `TeamMemberBasicFields.tsx` (< 75 lines) for Name, Role, Department selector, and Location inputs.
  4. Build `TeamMemberDetailsFields.tsx` (< 75 lines) for Bio textarea and Credentials input.
  5. Build `TeamMemberContactFields.tsx` (< 80 lines) for Email, LinkedIn, Display Order, and Visibility toggle.
  6. Build `TeamMemberForm.tsx` (< 90 lines) assembling the fields, `ImageUploader`, error display, and `FormActionButtons`.

---

### Task 5: Admin Team Management Pages (`src/app/admin/team/`)
- **Files:**
  - Create: `src/app/admin/team/page.tsx`
  - Create: `src/app/admin/team/new/page.tsx`
  - Create: `src/app/admin/team/[id]/page.tsx`
- **Steps:**
  1. Build `src/app/admin/team/page.tsx` (< 80 lines): Header with count, "+ Add Team Member" button, department filter tabs, and `TeamMemberTable`.
  2. Build `src/app/admin/team/new/page.tsx` (< 40 lines): Page container rendering `TeamMemberForm`.
  3. Build `src/app/admin/team/[id]/page.tsx` (< 50 lines): Dynamic edit route fetching member by ID and rendering `TeamMemberForm`.

---

### Task 6: Admin Navigation & Dashboard Integration
- **Files:**
  - Modify: `src/components/layout/AdminNavLinks.tsx`
  - Modify: `src/app/admin/page.tsx`
- **Steps:**
  1. Add `{ label: "Team", href: "/admin/team", icon: "..." }` into `ADMIN_NAV_ITEMS` in `src/components/layout/AdminNavLinks.tsx`.
  2. Add `team_members` count query and card to `AdminDashboard` in `src/app/admin/page.tsx` along with a "+ Add Team Member" quick action link.
  3. Keep both files strictly < 100 lines.

---

### Task 7: Public Team Directory Dynamic Integration
- **Files:**
  - Modify: `src/app/team/page.tsx`
- **Steps:**
  1. Update `TeamPage` in `src/app/team/page.tsx` to call `fetchPublicTeamMembers()` from `src/lib/services/teamService.ts`.
  2. Keep static principles, hero, voices, and categories intact while rendering dynamic members.
  3. Ensure seamless zero-flicker fallback when Supabase has no records or offline.
  4. Keep file strictly < 100 lines.

---

### Task 8: Verification & Quality Assurance
- **Steps:**
  1. Check line counts on every file touched or created in `src/` to guarantee 100% are < 100 lines.
  2. Run `npx tsc --noEmit` and confirm 0 TypeScript errors.
  3. Run `npm run lint` and confirm 0 ESLint errors.
  4. Run `graphify update .` to keep the knowledge graph current.
