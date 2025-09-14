import Dexie, { Table } from 'dexie';
import type { MediaAsset, Note, Progress, Quiz, Annotation, Question, Attempt } from '@/types';

export interface SettingKV { key: string; value: unknown }
export interface ContentBundle { id: string; title: string; payload: unknown; last_updated: string }

class StudyForgeDB extends Dexie {
  media!: Table<MediaAsset, string>;
  notes!: Table<Note, string>;
  progress!: Table<Progress, string>;
  quizzes!: Table<Quiz, string>;
  questions!: Table<Question, string>;
  attempts!: Table<Attempt, string>;
  annotations!: Table<Annotation, string>;
  settings!: Table<SettingKV, string>;
  contentBundles!: Table<ContentBundle, string>;

  constructor() {
    super('StudyForgeDB');
    this.version(1).stores({
      media: 'id, lesson_id, type, last_updated',
      notes: 'id, user_id, lesson_id, last_updated',
      progress: 'id, user_id, lesson_id, completed, percentage, last_updated',
      quizzes: 'id, lesson_id, last_updated',
      questions: 'id, quiz_id, last_updated',
      attempts: 'id, quiz_id, user_id, last_updated',
      annotations: 'id, lesson_id, user_id, page, last_updated',
      settings: 'key',
      contentBundles: 'id, last_updated'
    });
  }
}

export const db = new StudyForgeDB();

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const kv = await db.settings.get(key);
  return (kv?.value as T) ?? fallback;
}

export async function setSetting<T>(key: string, value: T) {
  await db.settings.put({ key, value });
}
