import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { useReducedMotionPref } from '@/ui/motion/useMotionPref';

export default function Onboarding() {
  const reduced = useReducedMotionPref();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (!reduced) {
      fetch('/lottie/soft-floating-cards.json').then((r) => r.json()).then(setData).catch(() => setData(null));
    }
  }, [reduced]);

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
        {!reduced && data && <Lottie animationData={data} loop autoplay speed={0.9} style={{ height: 300 }} />}
      </div>
    </div>
  );
}
