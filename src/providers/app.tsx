import { ReactNode, Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { BrowserRouter } from "react-router-dom";
import { AppErrorBoundary } from "@/providers/errorBoundary";
import { AppQueryClientProvider } from "@/providers/queryClient";
import { AuthProvider } from "@/providers/auth";
import { PageLoader } from "@/shared/components/PageLoader";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="top-right">
            <ModalsProvider>
              <AppQueryClientProvider>
                <AuthProvider>
                  <BrowserRouter>{children}</BrowserRouter>
                </AuthProvider>
              </AppQueryClientProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </Suspense>
    </AppErrorBoundary>
  );
};
