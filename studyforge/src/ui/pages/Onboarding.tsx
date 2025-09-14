import { Player } from 'lottie-react';
import cards from '/lottie/soft-floating-cards.json?url';
import { useReducedMotionPref } from '@/ui/motion/useMotionPref';

export default function Onboarding() {
  const reduced = useReducedMotionPref();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold">أهلاً بك في StudyForge</h2>
        <p className="text-muted">قم بإعداد تفضيلاتك واحفظها محليًا — يمكنك دائمًا تغييره لاحقًا.</p>
        <ul className="list-disc pr-5 text-sm text-muted">
          <li>الوضع دون اتصال — مزامنة عند الاتصال</li>
          <li>اختبارات تفاعلية مع شارة مصدر السؤال</li>
          <li>لوحة تحكم للمدرس لإدارة المحتوى</li>
        </ul>
      </div>
      <div className="rounded-xl bg-surface/60 p-4 backdrop-blur shadow-soft-warm">
        {!reduced && <Player src={cards} autoplay loop speed={0.9} style={{ height: 300 }} />}
      </div>
    </div>
  );
}
