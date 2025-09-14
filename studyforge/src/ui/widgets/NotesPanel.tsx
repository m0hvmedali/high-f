import { useEffect, useState } from 'react';
import { db } from '@/services/db/IndexedDBService';

export default function NotesPanel({ lessonId }: { lessonId: string }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    (async () => {
      const note = await db.notes.where('lesson_id').equals(lessonId).first();
      setValue(note?.content_md ?? '');
    })();
  }, [lessonId]);

  const save = async () => {
    await db.notes.put({ id: lessonId, user_id: 'local', lesson_id: lessonId, content_md: value, last_updated: new Date().toISOString() });
  };

  return (
    <div className="rounded-xl bg-surface p-3 shadow-soft-warm">
      <h3 className="mb-2 text-sm text-muted">ملاحظات الدرس</h3>
      <textarea className="h-40 w-full rounded-lg border border-border p-2" value={value} onChange={(e) => setValue(e.target.value)} aria-label="Notes" />
      <div className="mt-2 flex justify-end">
        <button className="btn btn-primary" onClick={save}>حفظ</button>
      </div>
    </div>
  );
}
