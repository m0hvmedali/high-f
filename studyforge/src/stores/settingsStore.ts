import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'high-contrast';
export type Language = 'ar' | 'en';

interface SettingsState {
  theme: Theme;
  language: Language;
  disableMotion: boolean;
  studyMode: boolean;
  setTheme: (t: Theme) => void;
  setLanguage: (l: Language) => void;
  setDisableMotion: (v: boolean) => void;
  toggleStudyMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'ar',
      disableMotion: false,
      studyMode: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setDisableMotion: (disableMotion) => set({ disableMotion }),
      toggleStudyMode: () => set((s) => ({ studyMode: !s.studyMode }))
    }),
    { name: 'settings-store' }
  )
);
