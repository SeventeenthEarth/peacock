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
      return null;
    }

    return this.props.children;
  }
}

const ReactRenderer: React.FC<ReactRendererProps> = ({ filename }) => {
  const LazyComponent = createLazyClaudeComponent(filename);

  return (
    <ErrorBoundaryComponent>
      <Suspense fallback={null}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundaryComponent>
  );
};

export default ReactRenderer;