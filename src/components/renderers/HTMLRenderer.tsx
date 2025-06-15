import React, { useEffect, useState } from 'react';
import { loadGeminiHTML } from '../../utils/fileLoader';

interface HTMLRendererProps {
  filename: string;
}

const HTMLRenderer: React.FC<HTMLRendererProps> = ({ filename }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHTML = async () => {
      try {
        setLoading(true);
        setError(null);
        const content = await loadGeminiHTML(filename);
        setHtmlContent(content);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'HTML 파일을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadHTML();
  }, [filename]);

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <iframe
      srcDoc={htmlContent}
      className="w-full h-screen border-0"
      sandbox="allow-scripts allow-same-origin allow-forms"
      title={`Gemini HTML: ${filename}`}
      onLoad={() => {
        // iframe이 로드된 후 인쇄 스타일 최적화
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentDocument) {
          const style = iframe.contentDocument.createElement('style');
          style.textContent = `
            @media print {
              @page {
                size: A4;
                margin: 20mm;
              }
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                margin: 0;
                padding: 0;
              }
              * {
                box-sizing: border-box;
              }
              /* Prevent page breaks in important elements */
              h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
              }
              img, table, figure {
                page-break-inside: avoid;
              }
              /* Remove unnecessary margins for print */
              .container, .wrapper {
                max-width: none;
                margin: 0;
                padding: 0;
              }
            }
          `;
          iframe.contentDocument.head.appendChild(style);
        }
      }}
    />
  );
};

export default HTMLRenderer;