import { Box, Text } from "@mantine/core";
import ReactCardFlip from "react-card-flip";

type Props = {
  number: number | null;
  isOpen: boolean;
};

export const TwoSidedCard = ({ number, isOpen }: Props) => {
  if (number === null) return <MyCard number={null} isOpen={false} />;

  return (
    <ReactCardFlip
      isFlipped={isOpen}
      flipSpeedBackToFront={0.5}
      flipSpeedFrontToBack={0.5}
    >
      {/* Front */}
      <MyCard number={number} isOpen={false} />
      {/* Back */}
      <MyCard number={number} isOpen={true} />
    </ReactCardFlip>
  );
};

const MyCard = ({ number, isOpen }: Props) => (
  <Box
    sx={(theme) => ({
      borderWidth: 1,
      borderStyle: number === null ? "dashed" : "solid",
      borderColor:
        number === null ? theme.colors.gray[5] : theme.colors.gray[6],
      borderRadius: 4,
      backgroundColor:
        number === null || isOpen ? undefined : theme.colors.gray[4],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })}
    w={50}
    h={70}
  >
    <Text fz="xl">{isOpen ? number : null}</Text>
  </Box>
);
