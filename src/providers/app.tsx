import { ReactNode, Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { AppErrorBoundary } from "@/providers/error-boundary";
import { AppQueryClientProvider } from "@/providers/query-client";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <AppQueryClientProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </AppQueryClientProvider>
        </MantineProvider>
      </Suspense>
    </AppErrorBoundary>
  );
};
