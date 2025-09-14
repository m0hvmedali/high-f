import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotionPref } from '@/ui/motion/useMotionPref';

export default function AppLayout() {
  const { studyMode, setTheme, theme, setLanguage, language } = useSettingsStore();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const reduced = useReducedMotionPref();

  useEffect(() => { if (studyMode) setSidebarOpen(false); }, [studyMode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        const btn = document.querySelector('[aria-label="Toggle study mode"]') as HTMLButtonElement | null;
        btn?.click();
      }
      if (e.key.toLowerCase() === 't') {
        e.preventDefault();
        const order: Array<typeof theme> = ['light', 'dark', 'high-contrast'];
        const idx = order.indexOf(theme);
        setTheme(order[(idx + 1) % order.length]);
      }
      if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setLanguage(language === 'ar' ? 'en' : 'ar');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [theme, setTheme, language, setLanguage]);

  return (
    <div className="min-h-screen bg-bg text-[15px]">
      <Header onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 p-4">
        <AnimatePresence initial={false}>
          {!studyMode && sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={reduced ? false : { opacity: 0, x: -12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
              className="col-span-12 md:col-span-3 lg:col-span-2 rounded-xl bg-surface p-3 shadow-soft-warm"
              aria-label="Sidebar"
            >
              <Nav className="space-y-1" />
            </motion.aside>
          )}
        </AnimatePresence>

        <main className={`${studyMode ? 'col-span-12' : 'col-span-12 md:col-span-9 lg:col-span-10'} min-h-[70vh]`}>
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl bg-surface p-4 shadow-soft-warm"
          >
            <Outlet />
          </motion.div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 backdrop-blur bg-bg/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary" onClick={onToggleSidebar} aria-label="Toggle sidebar">☰</button>
          <div className="text-lg font-semibold">StudyForge</div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <StudyModeToggle />
        </div>
      </div>
    </header>
  );
}

function Nav({ className = '' }: { className?: string }) {
  const links = [
    { to: '/', label: 'الرئيسية' },
    { to: '/dashboard', label: 'لوحة الطالب' },
    { to: '/teacher', label: 'لوحة المدرّس' },
    { to: '/settings', label: 'الإعدادات' }
  ];
  return (
    <nav className={className}>
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-warm-gradient text-primary' : 'hover:bg-warm-gradient'}`}
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-6 text-xs text-muted">
      © {new Date().getFullYear()} StudyForge
    </footer>
  );
}

function LanguageToggle() {
  const { language, setLanguage } = useSettingsStore();
  return (
    <select aria-label="Language" className="btn btn-secondary" value={language} onChange={(e) => setLanguage(e.target.value as any)}>
      <option value="ar">AR</option>
      <option value="en">EN</option>
    </select>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useSettingsStore();
  return (
    <select aria-label="Theme" className="btn btn-secondary" value={theme} onChange={(e) => setTheme(e.target.value as any)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="high-contrast">High Contrast</option>
    </select>
  );
}

function StudyModeToggle() {
  const { studyMode, toggleStudyMode } = useSettingsStore();
  return (
    <button className="btn btn-primary" onClick={toggleStudyMode} aria-pressed={studyMode} aria-label="Toggle study mode">
      🎓 {studyMode ? 'إيقاف وضع الدراسة' : 'تفعيل وضع الدراسة'}
    </button>
  );
}
