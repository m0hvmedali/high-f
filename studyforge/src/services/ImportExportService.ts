import JSZip from 'jszip';
import { db } from '@/services/db/IndexedDBService';

export async function exportLocal(): Promise<Blob> {
  const zip = new JSZip();
  const data = {
    media: await db.media.toArray(),
    notes: await db.notes.toArray(),
    progress: await db.progress.toArray(),
    quizzes: await db.quizzes.toArray(),
    questions: await db.questions.toArray(),
    attempts: await db.attempts.toArray(),
    annotations: await db.annotations.toArray(),
    settings: await db.settings.toArray(),
    contentBundles: await db.contentBundles.toArray()
  };
  zip.file('export.json', JSON.stringify(data, null, 2));
  return zip.generateAsync({ type: 'blob' });
}

export async function importLocal(file: File) {
  const text = await file.text();
  const data = JSON.parse(text);
  await db.transaction('rw', db.media, db.notes, db.progress, db.quizzes, db.questions, db.attempts, db.annotations, db.settings, db.contentBundles, async () => {
    await db.media.clear(); await db.media.bulkAdd(data.media ?? []);
    await db.notes.clear(); await db.notes.bulkAdd(data.notes ?? []);
    await db.progress.clear(); await db.progress.bulkAdd(data.progress ?? []);
    await db.quizzes.clear(); await db.quizzes.bulkAdd(data.quizzes ?? []);
    await db.questions.clear(); await db.questions.bulkAdd(data.questions ?? []);
    await db.attempts.clear(); await db.attempts.bulkAdd(data.attempts ?? []);
    await db.annotations.clear(); await db.annotations.bulkAdd(data.annotations ?? []);
    await db.settings.clear(); await db.settings.bulkAdd(data.settings ?? []);
    await db.contentBundles.clear(); await db.contentBundles.bulkAdd(data.contentBundles ?? []);
  });
}
