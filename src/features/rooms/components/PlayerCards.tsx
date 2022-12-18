import { useMemo } from "react";
import { Flex, Sx } from "@mantine/core";
import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";
import { TwoSidedCard } from "@/features/rooms/components/TwoSidedCard";
import { PlayerName } from "@/features/rooms/components/PlayerName";
import { isActive } from "@/features/rooms/models/player";

type Props = {
  room: Room;
  player: Player;
  sx?: Sx;
};

export const PlayerCards = ({ room, player, sx }: Props) => {
  const isOpen = room.cardStatus === "open";
  const activePlayers = useMemo(() => room.players.filter(isActive), [room]);

  return (
    <Flex justify="space-around" columnGap={6} rowGap={8} wrap="wrap" sx={sx}>
      {activePlayers.map((p) => (
        <Flex key={p.id} direction="column" align="center" w={126}>
          <TwoSidedCard number={p.number} isOpen={isOpen} />
          <PlayerName room={room} player={p} isMe={p.id === player.id} />
        </Flex>
      ))}
    </Flex>
  );
};
