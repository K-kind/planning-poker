import { ReactNode, Suspense } from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>{children}</BrowserRouter>
      </MantineProvider>
    </Suspense>
  );
};
