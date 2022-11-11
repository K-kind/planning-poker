import { useRoom } from "@/features/rooms/api/getRoom";
import { useSubscribeRoom } from "@/features/rooms/api/subscribeRoom";
import { NewPlayer } from "@/features/rooms/components/NewPlayer";
import { RoomBoard } from "@/features/rooms/components/RoomBoard";
import {
  getCurrentPlayerId,
  setCurrentPlayerId,
} from "@/features/rooms/models/player";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

export const RoomPage = () => {
  const params = useParams();
  const roomId = params.id!;
  const roomQuery = useRoom({ id: roomId });

  const onRoomUpdate = useCallback(() => {}, []);
  const onRoomDelete = useCallback(() => {}, []);
  const { updatedRoom } = useSubscribeRoom({
    id: roomId,
    onUpdate: onRoomUpdate,
    onDelete: onRoomDelete,
  });

  const room = updatedRoom ?? roomQuery.data!;
  const players = room.players;

  const [playerId, setPlayerId] = useState(() => getCurrentPlayerId(roomId));
  const onCreatePlayer = (newPlayerId: string) => {
    setPlayerId(newPlayerId);
    setCurrentPlayerId(roomId, newPlayerId);
  };
  const player = players.find((p) => p.id === playerId);

  return (
    <div>
      <div>部屋</div>
      <div style={{ whiteSpace: "pre" }}>
        {JSON.stringify(room, undefined, 2)}
      </div>

      <div>
        {player ? (
          <RoomBoard room={room} player={player} />
        ) : (
          <NewPlayer room={room} onSubmit={onCreatePlayer} />
        )}
      </div>
    </div>
  );
};
