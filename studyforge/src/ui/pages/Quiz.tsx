import { useMemo, useState } from 'react';
import QuickQuizWidget from '@/ui/widgets/QuickQuizWidget';

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const questions = useMemo(() => [
    {
      id: 'q1',
      body: 'ما نهاية الدالة f(x) = x^2 عندما x تؤول إلى 2؟',
      options: ['2', '4', '8', 'لا شيء مما سبق'],
      correct: '4',
      related: { name: 'تعريف النهاية', id: 'lesson-limit-def' }
    },
    {
      id: 'q2',
      body: 'True/False: الصوت ينتقل أسرع في الهواء منه في الماء.',
      options: ['صح', 'خطأ'],
      correct: 'خطأ',
      related: { name: 'خصائص الموجات', id: 'lesson-waves' }
    }
  ], []);

  const q = questions[index];

  return (
    <div className="mx-auto max-w-2xl">
      <QuickQuizWidget
        key={q.id}
        question={q}
        onAnswer={(isCorrect) => {
          setTimeout(() => setIndex((i) => Math.min(i + 1, questions.length - 1)), 600);
        }}
      />
      <div className="mt-4 text-center text-sm text-muted">{index + 1} / {questions.length}</div>
    </div>
  );
}
