import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

export default function ThemeController() {
  const { theme } = useSettingsStore();
  const [primary, setPrimary] = useState(getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim());
  const [secondary, setSecondary] = useState(getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim());
  const [accent, setAccent] = useState(getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim());

  useEffect(() => {
    // refresh values when theme changes
    const cs = getComputedStyle(document.documentElement);
    setPrimary(cs.getPropertyValue('--color-primary').trim());
    setSecondary(cs.getPropertyValue('--color-secondary').trim());
    setAccent(cs.getPropertyValue('--color-accent').trim());
  }, [theme]);

  const apply = () => {
    document.documentElement.style.setProperty('--color-primary', primary);
    document.documentElement.style.setProperty('--color-secondary', secondary);
    document.documentElement.style.setProperty('--color-accent', accent);
  };

  return (
    <div className="rounded-xl bg-surface p-3 shadow-soft-warm">
      <h3 className="mb-2 text-sm text-muted">تخصيص الألوان</h3>
      <div className="grid grid-cols-3 gap-2">
        <label className="flex items-center gap-2 text-sm"><span>Primary</span><input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} /></label>
        <label className="flex items-center gap-2 text-sm"><span>Secondary</span><input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)} /></label>
        <label className="flex items-center gap-2 text-sm"><span>Accent</span><input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} /></label>
      </div>
      <div className="mt-2 flex justify-end"><button className="btn btn-secondary" onClick={apply}>تطبيق</button></div>
    </div>
  );
}
