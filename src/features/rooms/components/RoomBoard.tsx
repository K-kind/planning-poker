import { useCallback } from "react";
import { useUpdatePlayer } from "@/features/rooms/api/updatePlayer";
import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";
import { Hands } from "@/features/rooms/components/Hands";
import { PlayerCards } from "@/features/rooms/components/PlayerCards";
import { RoomButtons } from "@/features/rooms/components/RoomButtons";
import { useUpdateRoom } from "@/features/rooms/api/updateRoom";

type Props = {
  room: Room;
  player: Player;
};

export const RoomBoard = ({ room, player }: Props) => {
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
    (card: number | null) => {
      updatePlayerMutation.mutate({ number: card });
    },
    [updatePlayerMutation]
  );

  return (
    <div>
      <div>
        <RoomButtons
          cardStatus={room.cardStatus}
          loading={updateRoomMuation.isLoading}
          onChangeStatus={toggleStatus}
          onClickReset={resetHands}
        />
      </div>
      <div>
        <PlayerCards room={room} player={player} />
      </div>
      <div>
        <Hands
          cards={room.cards}
          selectedCard={player.number}
          loading={updatePlayerMutation.isLoading}
          onSelect={updateHand}
        />
      </div>
    </div>
  );
};
