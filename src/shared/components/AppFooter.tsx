import { Link } from "react-router-dom";
import { Container, Flex, Footer, Text } from "@mantine/core";

export const AppFooter = () => {
  return (
    <Footer height={60} py="lg">
      <Container>
        <Flex align="center" gap="xl">
          <LinkItem to="/about" label="このアプリについて" />
          <LinkItem to="/requests/new" label="ご意見箱" />
          <LinkItem to="/terms" label="利用規約" />
        </Flex>
      </Container>
    </Footer>
  );
};

const LinkItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Text size="sm" c="dark.3">
        {label}
      </Text>
    </Link>
  );
};
