export default function LessonHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3 rounded-xl bg-warm-gradient p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
    </div>
  );
}
