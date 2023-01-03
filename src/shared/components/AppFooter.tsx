import { Link } from "react-router-dom";
import { Container, Flex, Footer, Text } from "@mantine/core";

export const AppFooter = () => {
  return (
    <Footer height={60} py="lg">
      <Container>
        <Flex align="center" gap="xl">
          <Link to="/requests/new" style={{ textDecoration: "none" }}>
            <Text size="sm" c="dark.3">
              ご意見箱
            </Text>
          </Link>

          <Link to="/terms" style={{ textDecoration: "none" }}>
            <Text size="sm" c="dark.3">
              利用規約
            </Text>
          </Link>
        </Flex>
      </Container>
    </Footer>
  );
};
