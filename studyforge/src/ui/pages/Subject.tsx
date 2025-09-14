import { useParams, Link } from 'react-router-dom';

export default function Subject() {
  const { subjectId } = useParams();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">المادة: {subjectId}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3,4].map((i) => (
          <Link key={i} to={`/sections/${i}`} className="rounded-xl bg-surface p-4 shadow-soft-warm hover:bg-warm-gradient">
            القسم {i}
          </Link>
        ))}
      </div>
    </div>
  );
}
