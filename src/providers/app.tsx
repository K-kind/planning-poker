import { ReactNode, Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { AppErrorBoundary } from "@/providers/errorBoundary";
import { AppQueryClientProvider } from "@/providers/queryClient";
import { AuthProvider } from "@/providers/auth";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="top-right">
            <AppQueryClientProvider>
              <AuthProvider>
                <BrowserRouter>{children}</BrowserRouter>
              </AuthProvider>
            </AppQueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </Suspense>
    </AppErrorBoundary>
  );
};
