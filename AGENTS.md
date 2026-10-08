# 🌍 NIMO — Project Architectural Rules & Standards

These rules and architectural principles are strictly scoped to the **NIMO** project (`Next.js 16 App Router`, `React 19`, `Tailwind CSS v4`, `Supabase`, and `TypeScript`). Every AI agent and developer working in this repository must adhere to them without exception.

---

### 📱 1. Core Architecture & Development Rules

1. **Cross-Platform Responsive Parity (iOS & Android Mobile Web + Desktop)**:
   * Design mobile-first with minimum touch target sizes (`44x44px`).
   * Test and guarantee flawless rendering across both iOS Safari (WebKit) and Android Chrome (Blink).
   * Account for safe areas and mobile viewport dynamics (use `dvh` / `min-h-dvh` instead of static `100vh`).

2. **< 100 Lines per File (Strict Limit)**:
   * **No single file in `src/` may exceed 100 lines of code**.
   * If a file approaches or exceeds this limit, immediately break it down into modular child components, custom hooks, or service utilities.

3. **Zero Inline Styles & Strict Design Tokens**:
   * Never use inline `style={{ ... }}` objects.
   * All styling must strictly utilize Tailwind CSS v4 design tokens defined in [`src/app/globals.css`](file:///c:/Users/AKUMAH98/Desktop/NIMO/src/app/globals.css) `@theme`:
     - **Primary**: `text-primary`, `bg-primary` (`#742581`), `bg-primary-dark` (`#52195d`), `bg-primary-light` (`#f3e8f5`)
     - **Secondary**: `text-secondary`, `bg-secondary` (`#16a34a`), `bg-secondary-light` (`#dcfce7`)
     - **Accent**: `text-accent`, `bg-accent` (`#f59e0b`), `bg-accent-light` (`#fef3c7`)
     - **Neutrals**: `text-text`, `text-text-light`, `bg-bg`, `bg-bg-alt`, `border-border`

4. **Zero Hardcoded Colors**:
   * Never write arbitrary hex values (e.g., `text-[#742581]`) in JSX markup. Always use the semantic theme classes (`text-primary`, etc.).

5. **Zero Inline Mock Data**:
   * Do not embed inline mock arrays or hardcoded placeholder datasets inside page or component files.
   * All fallback data, lists, or test data must reside in dedicated JSON files under [`src/data/`](file:///c:/Users/AKUMAH98/Desktop/NIMO/src/data/) (e.g., `data.json`, `searchFallbackData.json`).

6. **Strict Type Safety**:
   * All entities (Events, Posts, Reports, Inquiries, Testimonials) must have explicit types defined in [`src/types/`](file:///c:/Users/AKUMAH98/Desktop/NIMO/src/types/).
   * `npx tsc --noEmit` and `npm run lint` must always exit with **0 errors**.

7. **Semantic Web & SEO Best Practices**:
   * Use a single `<h1>` per page, appropriate HTML5 landmarks (`<main>`, `<article>`, `<section>`, `<nav>`), and dynamic Next.js Metadata API for page titles and OpenGraph tags.
   * Optimize all images with `next/image` providing explicit dimensions and responsive layouts.

---

### 🏗️ 2. The 10 Architectural & Refactoring Principles

1. **Single Responsibility Principle (SRP)**: Each file performs exactly one duty (one UI component, one hook, or one service).
2. **Separation of Concerns**: UI components must never contain Supabase database calls, fetch requests, or complex state algorithms.
3. **Feature-Based Architecture**: Organize components and views by feature domain (`src/components/home/`, `src/components/events/`, `src/components/reports/`, etc.).
4. **Component-Driven Architecture**: Build screens like Lego blocks composed of small, focused sub-components.
5. **Clean Architecture (Three Layers)**:
   - **Presentation Layer**: Components in `src/components/` rendering accessible UI.
   - **Domain Layer**: Custom React hooks in `src/hooks/` managing state and business rules.
   - **Data Layer**: Supabase clients and API wrappers in `src/lib/services/` with local fallback support.
6. **Co-Location Principle**: Feature-specific subcomponents and helpers live directly within their respective domain folders.
7. **Smart vs. Dumb Components**:
   - **Smart Components**: Page orchestrators and container components that coordinate data and actions.
   - **Dumb Components**: Presentational components that only receive props and render UI.
8. **Custom Hooks for Logic**: Move complex stateful client logic (searching, filtering, pagination, form validation) into dedicated hooks under `src/hooks/`.
9. **Service Layer**: All Supabase database queries and external API calls belong in `src/lib/services/`. UI never speaks directly to the raw Supabase client.
10. **The Golden Division of Labor**:
    - **Pages orchestrate**
    - **Hooks manage logic**
    - **Services handle APIs / Supabase**
    - **Components render UI**

---

### 📝 3. Communication & Transparency

* **Detailed Explanations**: Provide a clear, detailed breakdown of every change, component created, or refactoring performed.
