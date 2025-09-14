import Hls from 'hls.js';
import { useEffect, useRef } from 'react';
import { db } from '@/services/db/IndexedDBService';

interface Props { src: string; captionUrl?: string; lessonId?: string }

export default function VideoPlayer({ src, captionUrl, lessonId }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current!;
    let hls: Hls | null = null;
    if (Hls.isSupported() && src.endsWith('.m3u8')) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      video.src = src;
    }

    const loadProgress = async () => {
      if (!lessonId) return;
      const p = await db.progress.where('lesson_id').equals(lessonId).first();
      if (p?.last_position_seconds) video.currentTime = p.last_position_seconds;
    };

    const onTime = async () => {
      if (!lessonId) return;
      await db.progress.put({
        id: lessonId,
        user_id: 'local',
        lesson_id: lessonId,
        completed: false,
        percentage: (video.currentTime / (video.duration || 1)) * 100,
        last_position_seconds: video.currentTime,
        last_updated: new Date().toISOString()
      });
    };

    loadProgress();
    video.addEventListener('timeupdate', onTime);

    return () => {
      video.removeEventListener('timeupdate', onTime);
      hls?.destroy();
    };
  }, [src, lessonId]);

  return (
    <div className="space-y-2">
      <video ref={videoRef} className="h-auto w-full rounded-xl bg-black" controls playsInline />
      {captionUrl && (
        <track src={captionUrl} kind="captions" label="ar" default />
      )}
    </div>
  );
}
