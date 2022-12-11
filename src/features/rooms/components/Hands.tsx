import { Button, Flex, Sx, Text } from "@mantine/core";

type Props = {
  cards: number[];
  selectedCard: number | null;
  loading?: boolean;
  sx?: Sx;
  onSelect: (card: number) => void;
};

export const Hands = ({
  cards,
  selectedCard,
  loading,
  sx,
  onSelect,
}: Props) => {
  return (
    <Flex sx={sx} columnGap={16} rowGap={8} wrap="wrap">
      {cards.map((card, index) => (
        <Button
          key={`${card}.${index}`}
          variant={selectedCard === card ? "filled" : "light"}
          sx={{ pointerEvents: loading ? "none" : undefined }}
          w={50}
          h={70}
          p={0}
          onClick={() => onSelect(card)}
        >
          <Text fz="xl">{card}</Text>
        </Button>
      ))}
    </Flex>
  );
};
