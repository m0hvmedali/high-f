import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [url]);

  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))}>السابق</button>
        <div className="text-sm">صفحة {page} / {numPages || '?'}</div>
        <button className="btn btn-secondary" onClick={() => setPage((p) => Math.min(numPages, p + 1))}>التالي</button>
      </div>
      <Document file={url} onLoadSuccess={(info) => setNumPages(info.numPages)}>
        <Page pageNumber={page} renderAnnotationLayer renderTextLayer className="rounded-xl shadow-soft-warm" />
      </Document>
    </div>
  );
}
