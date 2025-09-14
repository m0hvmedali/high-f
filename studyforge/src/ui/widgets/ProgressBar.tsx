export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-bg">
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value} role="progressbar" />
    </div>
  );
}
