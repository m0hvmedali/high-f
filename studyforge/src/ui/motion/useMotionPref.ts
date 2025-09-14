import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/stores/settingsStore';

export function useReducedMotionPref() {
  const { disableMotion } = useSettingsStore();
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefers(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return disableMotion || prefers;
}
