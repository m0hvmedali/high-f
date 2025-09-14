# Changelog

## 0.1.0 (Sprint 0)

- Initialize StudyForge (Vite + React 18 + TS)
- Tailwind with tokenized warm theme (light/dark/high-contrast)
- AR/EN i18n + RTL auto switching
- Zustand stores (settings, auth, content, progress, quiz)
- Dexie IndexedDB schema mirroring key domain tables
- Supabase service (auth + offline sync skeleton, last_updated wins)
- Router + pages scaffold (Home, Dashboard, Subject, Section, Lesson, Quiz, Settings, Onboarding, TeacherDashboard)
- Core widgets: VideoPlayer (HLS + resume), AudioPlayer (speed/seek), PDFViewer, NotesPanel, ProgressBar, QuickQuizWidget, ThemeController
- PWA setup (manifest + Workbox runtime caching)
- Lottie animations (onboarding, hero) with reduced motion support
- Sample content JSON and .env.example

Next steps:
- Implement full auth UI (login/signup) and session gating
- Add Upload to Supabase Storage and database mutations
- Conflict resolution UI for sync
- Storybook stories + testing (Vitest/Playwright)
