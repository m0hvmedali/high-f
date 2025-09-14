import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#059669', '#D97706', '#0891B2'];

export default function Dashboard() {
  const progressData = useMemo(() => (
    [
      { name: 'الأسبوع 1', progress: 20 },
      { name: 'الأسبوع 2', progress: 35 },
      { name: 'الأسبوع 3', progress: 55 },
      { name: 'الأسبوع 4', progress: 72 }
    ]
  ), []);

  const resultsData = useMemo(() => (
    [
      { name: 'رياضيات', score: 82 },
      { name: 'فيزياء', score: 76 },
      { name: 'لغة', score: 91 }
    ]
  ), []);

  const pieData = useMemo(() => (
    [
      { name: 'مكتمل', value: 12 },
      { name: 'قيد التقدم', value: 7 },
      { name: 'غير مبدوء', value: 5 }
    ]
  ), []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">لوحة الطالب</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <h3 className="mb-2 text-sm text-muted">التقدّم العام</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ left: -10, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="name" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#059669" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <h3 className="mb-2 text-sm text-muted">نتائج حديثة</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resultsData} margin={{ left: -20, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#D97706" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
          <h3 className="mb-2 text-sm text-muted">حالة الدروس</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={60} paddingAngle={4}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-surface p-4 shadow-soft-warm">
        <h3 className="mb-3 text-sm text-muted">الاختبارات القادمة</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-muted">
                <th className="p-2 text-start">المادة</th>
                <th className="p-2 text-start">العنوان</th>
                <th className="p-2 text-start">التاريخ</th>
                <th className="p-2 text-start">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: 'رياضيات', t: 'اشتقاق الدوال', d: '2025-10-01' },
                { s: 'لغة', t: 'النحو المتقدم', d: '2025-10-05' }
              ].map((row, i) => (
                <tr key={i} className="border-b border-border/40 hover:bg-warm-gradient">
                  <td className="p-2">{row.s}</td>
                  <td className="p-2">{row.t}</td>
                  <td className="p-2">{row.d}</td>
                  <td className="p-2"><Link to="/quiz/demo" className="btn btn-secondary">استعراض</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
