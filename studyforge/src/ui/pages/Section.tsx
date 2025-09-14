import { Link, useParams } from 'react-router-dom';

export default function Section() {
  const { sectionId } = useParams();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">القسم: {sectionId}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3].map((i) => (
          <Link key={i} to={`/lessons/${sectionId}-${i}`} className="rounded-xl bg-surface p-4 shadow-soft-warm hover:bg-warm-gradient">
            الدرس {i}
          </Link>
        ))}
      </div>
    </div>
  );
}
