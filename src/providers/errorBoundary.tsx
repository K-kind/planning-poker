import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <h2>エラーが発生しました。</h2>
      <pre>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        もう一度、実行する
      </button>
    </div>
  );
};

const onError = (error: Error, info: { componentStack: string }) => {
  console.error("error.message", error.message);
  console.error("info.componentStack:", info.componentStack);
};

type Props = {
  children: ReactNode;
};

export const AppErrorBoundary = ({ children }: Props) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={ErrorFallback}
          onError={onError}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
