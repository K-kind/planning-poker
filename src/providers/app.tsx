import { ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppErrorBoundary } from "@/providers/errorBoundary";
import { AppQueryClientProvider } from "@/providers/queryClient";
import { AuthProvider } from "@/providers/auth";
import { PageLoader } from "@/shared/components/PageLoader";
import { UiThemeProvider } from "@/providers/uiTheme";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <AppErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <UiThemeProvider>
          <AppQueryClientProvider>
            <AuthProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </AuthProvider>
          </AppQueryClientProvider>
        </UiThemeProvider>
      </Suspense>
    </AppErrorBoundary>
  );
};
