import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '@/services/supabase/SupabaseService';

interface AuthState {
  session: Session | null;
  user: User | null;
  init: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      init: () => {
        SupabaseService.onAuthStateChange((session) => set({ session, user: session?.user ?? null }));
      },
      signIn: async (email, password) => {
        const session = await SupabaseService.signIn(email, password);
        set({ session, user: session?.user ?? null });
      },
      signUp: async (email, password) => {
        const session = await SupabaseService.signUp(email, password);
        set({ session, user: session?.user ?? null });
      },
      signOut: async () => {
        await SupabaseService.signOut();
        set({ session: null, user: null });
      }
    }),
    { name: 'auth-store' }
  )
);
