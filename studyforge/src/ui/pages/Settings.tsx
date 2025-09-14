import { useSettingsStore } from '@/stores/settingsStore';

export default function Settings() {
  const { theme, setTheme, language, setLanguage, disableMotion, setDisableMotion } = useSettingsStore();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">الإعدادات</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <label className="block text-sm text-muted">الثيم</label>
          <select className="btn btn-secondary mt-2" value={theme} onChange={(e) => setTheme(e.target.value as any)}>
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
            <option value="high-contrast">تباين عالٍ</option>
          </select>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <label className="block text-sm text-muted">اللغة</label>
          <select className="btn btn-secondary mt-2" value={language} onChange={(e) => setLanguage(e.target.value as any)}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <label className="block text-sm text-muted">الحركة</label>
          <div className="mt-2 flex items-center gap-2">
            <input id="disableMotion" type="checkbox" checked={disableMotion} onChange={(e) => setDisableMotion(e.target.checked)} />
            <label htmlFor="disableMotion">إيقاف الحركة</label>
          </div>
        </div>
      </div>
    </div>
  );
}
