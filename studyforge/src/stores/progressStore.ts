import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  map: Record<string, { percentage: number; completed: boolean }>;
  setProgress: (lessonId: string, percentage: number) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      map: {},
      setProgress: (lessonId, percentage) => set((s) => ({ map: { ...s.map, [lessonId]: { percentage, completed: percentage >= 100 } } }))
    }),
    { name: 'progress-store' }
  )
);
