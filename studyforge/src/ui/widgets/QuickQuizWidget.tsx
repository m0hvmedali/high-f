import { useState } from 'react';
import ProgressBar from './ProgressBar';

interface Q {
  id: string;
  body: string;
  options: string[];
  correct: string;
  related?: { name: string; id: string };
}

export default function QuickQuizWidget({ question, onAnswer }: { question: Q; onAnswer: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const submit = () => {
    if (!selected) return;
    const ok = selected === question.correct;
    setResult(ok ? 'correct' : 'wrong');
    onAnswer(ok);
  };

  return (
    <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold">سؤال</h3>
        {question.related && (
          <span title={`مصدر السؤال: ${question.related.name}`} aria-label="مصدر السؤال" className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs ${result === 'correct' ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
            ℹ️
          </span>
        )}
      </div>
      <p className="mb-3 text-sm">{question.body}</p>
      <div className="grid gap-2">
        {question.options.map((o) => (
          <label key={o} className={`flex cursor-pointer items-center gap-2 rounded-lg border border-border p-2 hover:bg-warm-gradient ${selected === o ? 'ring-2 ring-accent' : ''}`}>
            <input type="radio" name={question.id} value={o} onChange={() => setSelected(o)} />
            <span>{o}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button className="btn btn-primary" onClick={submit}>تحقّق</button>
        {result !== 'idle' && (
          <span className={`text-sm ${result === 'correct' ? 'text-primary' : 'text-red-600'}`}>{result === 'correct' ? 'إجابة صحيحة' : 'إجابة خاطئة'}</span>
        )}
      </div>
      <div className="mt-3"><ProgressBar value={selected ? 100 : 0} /></div>
    </div>
  );
}
