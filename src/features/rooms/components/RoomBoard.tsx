import { useCallback, useState } from "react";
import { Flex } from "@mantine/core";
import { useUpdatePlayer } from "@/features/rooms/api/updatePlayer";
import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";
import { Hands } from "@/features/rooms/components/Hands";
import { PlayerCards } from "@/features/rooms/components/PlayerCards";
import { RoomButtons } from "@/features/rooms/components/RoomButtons";
import { useUpdateRoom } from "@/features/rooms/api/updateRoom";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import { RoomSettingsDrawer } from "@/features/rooms/components/RoomSettingsDrawer";

type Props = {
  room: Room;
  player: Player;
};

export const RoomBoard = ({ room, player }: Props) => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpened(true), []);
  const closeDrawer = useCallback(() => setDrawerOpened(false), []);

  const updateRoomMuation = useUpdateRoom({ id: room.id });
  const toggleStatus = useCallback(
    (status: Room["cardStatus"]) => {
      updateRoomMuation.mutate({ cardStatus: status });
    },
    [updateRoomMuation]
  );
  const resetHands = useCallback(() => {
    updateRoomMuation.mutate({
      cardStatus: "hidden",
      players: room.players.map((p) => ({ ...p, number: null })),
    });
  }, [updateRoomMuation, room]);

  const updatePlayerMutation = useUpdatePlayer({ id: player.id, room });
  const updateHand = useCallback(
    (card: number) => {
      const updatedNumber = card === player.number ? null : card;
      updatePlayerMutation.mutate({ number: updatedNumber });
    },
    [updatePlayerMutation, player]
  );

  return (
    <Flex direction="column" align="center" pt={{ base: "xl" }}>
      <RoomHeader
        room={room}
        openDrawer={openDrawer}
        sx={{ marginBottom: 40, width: "100%" }}
      />

      <RoomSettingsDrawer
        room={room}
        opened={drawerOpened}
        closeDrawer={closeDrawer}
      />

      <RoomButtons
        cardStatus={room.cardStatus}
        loading={updateRoomMuation.isLoading}
        sx={() => ({ marginBottom: 40 })}
        onChangeStatus={toggleStatus}
        onClickReset={resetHands}
      />

      <PlayerCards
        room={room}
        player={player}
        sx={() => ({ marginBottom: 40 })}
      />

      <Hands
        cards={room.cards}
        selectedCard={player.number}
        loading={updatePlayerMutation.isLoading}
        sx={{ maxWidth: 700 }}
        onSelect={updateHand}
      />
    </Flex>
  );
};
