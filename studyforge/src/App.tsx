import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import router from './router';
import './i18n';
import { useSettingsStore } from './stores/settingsStore';
import { useAuthStore } from './stores/authStore';

export default function App() {
  const { language, theme } = useSettingsStore();
  const { init } = useAuthStore();

  useEffect(() => { init(); }, [init]);

  useEffect(() => {
    document.documentElement.lang = language === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('data-theme', theme);
  }, [language, theme]);

  return <RouterProvider router={router} />;
}
