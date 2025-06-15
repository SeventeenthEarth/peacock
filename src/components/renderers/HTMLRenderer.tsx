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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">HTML 파일 로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-red-50 border border-red-200 rounded-lg">
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            HTML 렌더링 오류
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <iframe
        srcDoc={htmlContent}
        className="w-full h-screen border-0 bg-white"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
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
                }
                * {
                  box-sizing: border-box;
                }
              }
            `;
            iframe.contentDocument.head.appendChild(style);
          }
        }}
      />
    </div>
  );
};

export default HTMLRenderer;