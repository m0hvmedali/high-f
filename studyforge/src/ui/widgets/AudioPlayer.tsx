import { useEffect, useRef, useState } from 'react';

interface Props { src: string }

export default function AudioPlayer({ src }: Props) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => { if (ref.current) ref.current.playbackRate = speed; }, [speed]);

  return (
    <div className="flex flex-col gap-2">
      <audio ref={ref} src={src} controls className="w-full" />
      <div className="flex items-center gap-2">
        <button className="btn btn-secondary" onClick={() => { if (ref.current) ref.current.currentTime -= 15; }}>-15s</button>
        <button className="btn btn-secondary" onClick={() => { if (ref.current) ref.current.currentTime += 15; }}>+15s</button>
        <label className="ml-auto text-sm text-muted">السرعة</label>
        <select className="btn btn-secondary" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}>
          {[0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => <option key={s} value={s}>{s}x</option>)}
        </select>
      </div>
    </div>
  );
}
