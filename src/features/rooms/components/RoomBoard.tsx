import { useCallback, useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUpdatePlayer } from "@/features/rooms/api/updatePlayer";
import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";
import { Hands } from "@/features/rooms/components/Hands";
import { PlayerCards } from "@/features/rooms/components/PlayerCards";
import { RoomButtons } from "@/features/rooms/components/RoomButtons";
import { useUpdateRoom } from "@/features/rooms/api/updateRoom";
import { RoomHeader } from "@/features/rooms/components/RoomHeader";
import { RoomSettingsDrawer } from "@/features/rooms/components/RoomSettingsDrawer";
import { isActive } from "@/features/rooms/models/player";
import { RoomHelpDrawer } from "@/features/rooms/components/RoomHelpDrawer";

type Props = {
  room: Room;
  player: Player;
};

export const RoomBoard = ({ room, player }: Props) => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [helpOpened, setHelpOpened] = useState(false);

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

  const queryClient = useQueryClient();
  // update my lastAccessedAt value on the first render
  useEffect(() => {
    updatePlayerMutation.mutate(
      { lastAccessedAt: new Date() },
      {
        onSuccess: () => {
          // refech room because subscription may not be ready to catch this change
          queryClient.invalidateQueries({ queryKey: ["room", room.id] });
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  // refresh page on window focus if stale
  useEffect(() => {
    const focusListener = () => {
      if (!isActive(player)) navigate(0);
    };
    window.addEventListener("focus", focusListener);
    return () => window.removeEventListener("focus", focusListener);
  }, [player, navigate]);

  return (
    <Flex direction="column" align="center" pt={{ base: "xl" }}>
      <RoomHeader
        room={room}
        openSettings={() => setSettingsOpened(true)}
        openHelp={() => setHelpOpened(true)}
        sx={{ marginBottom: 40, width: "100%" }}
      />

      <RoomHelpDrawer
        opened={helpOpened}
        closeDrawer={() => setHelpOpened(false)}
      />

      <RoomSettingsDrawer
        room={room}
        opened={settingsOpened}
        player={player}
        closeDrawer={() => setSettingsOpened(false)}
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
