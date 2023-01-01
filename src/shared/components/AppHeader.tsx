import { Link } from "react-router-dom";
import { Container, Flex, Header, Title, useMantineTheme } from "@mantine/core";

export const AppHeader = () => {
  const theme = useMantineTheme();

  return (
    <Header height={55} px="md">
      <Container>
        <Flex align="center" h={55}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title size="h3" c={theme.primaryColor}>
              Simple Planning Poker
            </Title>
          </Link>
        </Flex>
      </Container>
    </Header>
  );
};
