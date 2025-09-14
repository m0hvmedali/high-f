import { useParams } from 'react-router-dom';
import VideoPlayer from '@/ui/widgets/VideoPlayer';
import AudioPlayer from '@/ui/widgets/AudioPlayer';
import PDFViewer from '@/ui/widgets/PDFViewer';
import NotesPanel from '@/ui/widgets/NotesPanel';
import ThemeController from '@/ui/widgets/ThemeController';

export default function Lesson() {
  const { lessonId } = useParams();
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <h2 className="text-2xl font-semibold">الدرس: {lessonId}</h2>
        <div className="rounded-xl bg-surface p-3 shadow-soft-warm">
          <VideoPlayer src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" captionUrl="/captions/sample.vtt" />
        </div>
        <div className="rounded-xl bg-surface p-3 shadow-soft-warm">
          <PDFViewer url="/sample.pdf" />
        </div>
        <div className="rounded-xl bg-surface p-3 shadow-soft-warm">
          <AudioPlayer src="/sample.mp3" />
        </div>
      </div>
      <div className="space-y-4">
        <NotesPanel lessonId={lessonId ?? ''} />
        <ThemeController />
      </div>
    </div>
  );
}
