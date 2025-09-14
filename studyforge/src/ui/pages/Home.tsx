import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPref } from '@/ui/motion/useMotionPref';

export default function Home() {
  const reduced = useReducedMotionPref();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (!reduced) {
      fetch('/lottie/warm-sunrise.json').then((r) => r.json()).then(setData).catch(() => setData(null));
    }
  }, [reduced]);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-warm-gradient opacity-70" />
      <div className="relative z-10 grid items-center gap-6 p-6 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ lineHeight: 1.1 }}>
            منصة تعليمية تفاعلية للطلاب والمدرسين
          </h1>
          <p className="text-muted max-w-prose">
            تعلّم بذكاء حتى بدون اتصال — دروس مرئية وصوتية وملفات PDF، اختبارات تفاعلية، وتتبع تقدّمك بسهولة.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/onboarding" className="btn btn-primary">ابدأ الآن</Link>
            <Link to="/dashboard" className="btn btn-secondary">لوحة الطالب</Link>
          </div>
        </div>
        <motion.div initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.6 }} className="rounded-xl bg-surface/60 p-4 backdrop-blur shadow-soft-warm">
          {!reduced && data && (
            <Lottie animationData={data} loop autoplay style={{ width: '100%', height: 280, opacity: 1 }} />
          )}
        </motion.div>
      </div>
    </div>
  );
}
