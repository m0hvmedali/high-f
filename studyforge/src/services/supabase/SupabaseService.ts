import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';
import { db } from '@/services/db/IndexedDBService';
import type { MediaAsset, Note, Progress, Quiz, Question, Attempt } from '@/types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

class SupabaseServiceClass {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '', {
      auth: { persistSession: true, autoRefreshToken: true }
    });
  }

  onAuthStateChange(cb: (s: Session | null) => void) {
    this.client.auth.onAuthStateChange((_event, session) => cb(session));
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.session;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
    return data.session;
  }

  async signOut() {
    await this.client.auth.signOut();
  }

  // Sync strategy: last_updated timestamp wins
  private newer<T extends { id: string; last_updated: string }>(a: T, b: T) {
    return new Date(a.last_updated).getTime() >= new Date(b.last_updated).getTime() ? a : b;
  }

  async syncAll(userId: string) {
    await this.syncTable<Note>('notes', userId);
    await this.syncTable<Progress>('progress', userId);
    await this.syncTable<MediaAsset>('media_assets', userId);
    await this.syncTable<Quiz>('quizzes', userId);
    await this.syncTable<Question>('questions', userId);
    await this.syncTable<Attempt>('attempts', userId);
  }

  private async syncTable<T extends { id: string; last_updated: string }>(table: string, userId: string) {
    // 1) pull remote
    const { data: remote, error } = await this.client.from(table).select('*').eq('user_id', userId);
    if (error) throw error;

    // 2) read local
    // @ts-expect-error dynamic table access
    const local: T[] = await db[table === 'media_assets' ? 'media' : table].toArray();

    // 3) merge and write both sides
    const mergedMap = new Map<string, T>();
    for (const r of remote as T[]) mergedMap.set(r.id, r);
    for (const l of local) {
      const ex = mergedMap.get(l.id);
      mergedMap.set(l.id, ex ? this.newer(ex, l) : l);
    }

    const merged = Array.from(mergedMap.values());

    // push to remote
    if (merged.length) {
      const upsert = merged.map((m) => ({ ...m, user_id: (m as any).user_id ?? userId }));
      const { error: upErr } = await this.client.from(table).upsert(upsert, { onConflict: 'id' });
      if (upErr) throw upErr;
    }

    // write local
    // @ts-expect-error dynamic table access
    await db[table === 'media_assets' ? 'media' : table].clear();
    // @ts-expect-error dynamic table access
    await db[table === 'media_assets' ? 'media' : table].bulkAdd(merged);
  }
}

export const SupabaseService = new SupabaseServiceClass();
