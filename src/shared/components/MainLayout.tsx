import { ReactNode } from "react";
import { AppShell, Container } from "@mantine/core";
import { AppHeader } from "@/shared/components/AppHeader";
import { AppFooter } from "@/shared/components/AppFooter";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <AppShell
      header={<AppHeader />}
      footer={<AppFooter />}
      fixed={false}
      styles={{
        root: { minHeight: "100vh", display: "flex", flexDirection: "column" },
        body: { flex: 1 },
      }}
    >
      <Container>{children}</Container>
    </AppShell>
  );
};
