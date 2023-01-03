import { ForwardRefExoticComponent, ReactNode } from "react";
import { Box, BoxProps, Text } from "@mantine/core";
import styled from "@emotion/styled";

type Props = {
  title: string;
  children: ReactNode;
};

export const ItemWithTitle = ({ title, children }: Props) => {
  return (
    <Box mb={32}>
      <Box component="h2" mt={0} mb="xs">
        <Text fz="sm">{title}</Text>
      </Box>
      <StyledChildrenBox fz="sm" lh={2}>
        {children}
      </StyledChildrenBox>
    </Box>
  );
};

const StyledChildrenBox = styled<ForwardRefExoticComponent<BoxProps>>(
  Box as any
)`
  & > * {
    margin-top: 0;
  }
  & * {
    font-size: inherit;
    line-height: inherit;
  }
`;
