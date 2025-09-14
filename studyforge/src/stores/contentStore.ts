import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Subject, Section, Lesson, MediaAsset } from '@/types';

interface ContentState {
  subjects: Subject[];
  sections: Section[];
  lessons: Lesson[];
  media: MediaAsset[];
  setAll: (p: Partial<ContentState>) => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      subjects: [],
      sections: [],
      lessons: [],
      media: [],
      setAll: (p) => set(p)
    }),
    { name: 'content-store' }
  )
);
