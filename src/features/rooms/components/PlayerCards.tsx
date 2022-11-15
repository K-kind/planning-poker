import { Box, Flex, Sx, Text, useMantineTheme } from "@mantine/core";
import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";

type Props = {
  room: Room;
  player: Player;
  sx?: Sx;
};

export const PlayerCards = ({ room, player, sx }: Props) => {
  const isOpen = room.cardStatus === "open";
  const theme = useMantineTheme();

  return (
    <Flex justify="space-around" columnGap={6} rowGap={8} wrap="wrap" sx={sx}>
      {room.players.map((p) => (
        <Flex key={p.id} direction="column" align="center" w={126}>
          <Box
            sx={() => ({
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "gray",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
            bg={p.number === null || isOpen ? undefined : "rgba(0, 0, 0, .12)"}
            w={50}
            h={70}
          >
            <Text fz="xl">{isOpen ? p.number : null}</Text>
          </Box>
          <Text
            size="sm"
            mt={4}
            c={p.id === player.id ? theme.primaryColor : undefined}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "22px",
              height: "calc(22px * 2)",
            }}
          >
            {p.name}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
