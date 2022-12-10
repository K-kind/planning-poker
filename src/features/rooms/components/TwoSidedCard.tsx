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
    sx={() => ({
      borderWidth: 1,
      borderStyle: number === null ? "dashed" : "solid",
      borderColor: "gray",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    })}
    bg={number === null || isOpen ? undefined : "rgba(0, 0, 0, .12)"}
    w={50}
    h={70}
  >
    <Text fz="xl">{isOpen ? number : null}</Text>
  </Box>
);
