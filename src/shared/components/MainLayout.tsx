import { ReactNode } from "react";
import {
  AppShell,
  Container,
  Flex,
  Header,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  const theme = useMantineTheme();
  return (
    <AppShell
      header={
        <Header height={{ base: 40, md: 55 }} px="md">
          <Container>
            <Flex align="center" h={{ base: 40, md: 55 }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Title size="h3" c={theme.primaryColor}>
                  Planning Poker
                </Title>
              </Link>
            </Flex>
          </Container>
        </Header>
      }
    >
      <Container>{children}</Container>
    </AppShell>
  );
};
