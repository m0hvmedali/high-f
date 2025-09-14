import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizState {
  answers: Record<string, string>;
  setAnswer: (questionId: string, value: string) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (questionId, value) => set((s) => ({ answers: { ...s.answers, [questionId]: value } }))
    }),
    { name: 'quiz-store' }
  )
);
