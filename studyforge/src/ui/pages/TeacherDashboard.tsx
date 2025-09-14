export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">لوحة المدرّس</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <h3 className="mb-2 text-sm text-muted">رفع درس</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full rounded-lg border border-border p-2" placeholder="عنوان الدرس" />
            <select className="w-full rounded-lg border border-border p-2">
              <option>فيديو</option>
              <option>صوت</option>
              <option>PDF</option>
              <option>صورة/شرح يدوي</option>
            </select>
            <input type="file" className="w-full rounded-lg border border-border p-2 file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-white" />
            <button className="btn btn-primary">حفظ كمسودة</button>
          </form>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <h3 className="mb-2 text-sm text-muted">إضافة اختبار</h3>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full rounded-lg border border-border p-2" placeholder="عنوان الاختبار" />
            <textarea className="w-full rounded-lg border border-border p-2" placeholder="أسئلة بصيغة JSON مبسطة" />
            <button className="btn btn-secondary">إضافة</button>
          </form>
        </div>
      </div>
      <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
        <h3 className="mb-3 text-sm text-muted">الدروس المنشورة</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-muted">
                <th className="p-2 text-start">العنوان</th>
                <th className="p-2 text-start">الحالة</th>
                <th className="p-2 text-start">آخر تحديث</th>
                <th className="p-2 text-start">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {[1,2].map((i) => (
                <tr key={i} className="border-b border-border/40 hover:bg-warm-gradient">
                  <td className="p-2">درس {i}</td>
                  <td className="p-2">منشور</td>
                  <td className="p-2">2025-09-10</td>
                  <td className="p-2"><button className="btn btn-secondary">إلغاء النشر</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
