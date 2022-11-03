import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";

export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};
