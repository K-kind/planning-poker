import { Link } from "react-router-dom";
import { Container, Footer, Text } from "@mantine/core";

export const AppFooter = () => {
  return (
    <Footer height={60} py="lg">
      <Container>
        <Link to="/terms" style={{ textDecoration: "none" }}>
          <Text size="sm" c="dark.3">
            利用規約
          </Text>
        </Link>
      </Container>
    </Footer>
  );
};
