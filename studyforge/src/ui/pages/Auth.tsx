import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuthStore();

  const submit = async () => {
    setError(null); setLoading(true);
    try {
      if (mode === 'login') await signIn(email, password);
      else await signUp(email, password);
    } catch (e: any) { setError(e.message || 'خطأ'); }
    finally { setLoading(false); }
  };

  return (
    <div className="mx-auto max-w-sm space-y-4">
      <h2 className="text-2xl font-semibold">{mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}</h2>
      <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
        <label className="mb-2 block text-sm">البريد الإلكتروني</label>
        <input className="mb-3 w-full rounded-lg border border-border p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="mb-2 block text-sm">كلمة المرور</label>
        <input className="mb-3 w-full rounded-lg border border-border p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="mb-2 rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</div>}
        <div className="flex items-center justify-between">
          <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? '...' : 'متابعة'}</button>
          <button className="btn btn-secondary" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'إنشاء حساب' : 'لدي حساب'}
          </button>
        </div>
      </div>
    </div>
  );
}
