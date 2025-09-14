# StudyForge

Offline-first e-learning SPA built with Vite + React 18 + TypeScript, Tailwind CSS, PWA, IndexedDB (Dexie), Zustand, i18n (AR/EN + RTL), Framer Motion + Lottie, Supabase (Auth/DB/Storage), Storybook, Vitest, and Playwright.

Default language: Arabic (RTL). English is available via toggle.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Development server

```bash
npm run dev
```

3. Build + preview

```bash
npm run build && npm run preview
```

4. Storybook

```bash
npm run storybook
```

5. Tests

- Unit: `npm test`
- E2E: `npm run e2e`

## Environment

Create `.env.local` (or use `.env`) with:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Supabase (local or cloud)

- Create a Supabase project (or run Supabase locally).
- Run the SQL migration in `supabase/migrations/001_init.sql` using the SQL editor.
- Create storage buckets if needed (e.g., `lessons`).
- Obtain `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from project settings.

### Local Supabase (optional)

If using the Supabase CLI locally:

```bash
supabase start
supabase db reset # applies migrations from supabase/migrations
```

## PWA & Offline

- Configured via `vite-plugin-pwa` with Workbox runtime caching.
- IndexedDB schema in `src/services/db/IndexedDBService.ts` mirrors key tables.
- Background sync flow is triggered on sign-in (see `SupabaseService.syncAll`).

## Project structure

```
src/
  ui/
    layout/ AppLayout.tsx (Header/Sidebar/Footer + toggles)
    pages/ Home, Dashboard, Subject, Section, Lesson, Quiz, Settings, Onboarding, TeacherDashboard
    widgets/ VideoPlayer, AudioPlayer, PDFViewer, NotesPanel, ProgressBar, QuickQuizWidget, ThemeController
  services/
    db/IndexedDBService.ts
    supabase/SupabaseService.ts
    PWAService.ts, SearchService.ts
  stores/
    settingsStore, authStore, contentStore, progressStore, quizStore
  styles/tokens.css
  data/sample-content.json
```

## Accessibility

- WCAG AA color contrast via warm tokens.
- Focus states, ARIA roles/labels where applicable.
- Respects `prefers-reduced-motion` and a manual "Disable Motion" switch.

## Theming & Tokens

- Theme tokens live in `src/styles/tokens.css` with light, dark, and high-contrast.
- Tailwind maps vars for colors/shadows/gradient.
- ThemeController allows runtime token tweaking.

## Scripts

- `start`, `dev`, `build`, `preview`, `storybook`, `test`, `e2e`.

## Demo data

- `src/data/sample-content.json` contains a minimal sample that you can load into stores or Supabase.

## Next steps

- Wire actual Supabase storage for teacher uploads.
- Build full quiz flows with attempts and cloud sync.
- Add Storybook stories for all core widgets.
- Expand E2E coverage.
