import React, { Suspense } from 'react';
import { createLazyClaudeComponent } from '../../utils/fileLoader';

interface ReactRendererProps {
  filename: string;
}

class ErrorBoundaryComponent extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px] bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              컴포넌트 렌더링 오류
            </h3>
            <p className="text-red-600 mb-4">
              {this.state.error?.message || '알 수 없는 오류가 발생했습니다.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              다시 시도
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ReactRenderer: React.FC<ReactRendererProps> = ({ filename }) => {
  const LazyComponent = createLazyClaudeComponent(filename);

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white p-8">
      <ErrorBoundaryComponent>
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">컴포넌트 로딩 중...</p>
              </div>
            </div>
          }
        >
          <LazyComponent />
        </Suspense>
      </ErrorBoundaryComponent>
    </div>
  );
};

export default ReactRenderer;