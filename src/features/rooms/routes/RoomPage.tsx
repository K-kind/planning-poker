import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "@/features/rooms/api/getRoom";
import { useSubscribeRoom } from "@/features/rooms/api/subscribeRoom";
import { NewPlayer } from "@/features/rooms/components/NewPlayer";
import { RoomBoard } from "@/features/rooms/components/RoomBoard";
import { getStorageRoom, setStorageRoom } from "@/features/rooms/models/room";

export const RoomPage = () => {
  const params = useParams();
  const roomId = params.id!;
  const roomQuery = useRoom({ id: roomId });

  const onRoomUpdate = useCallback(() => {}, []);
  const onRoomDelete = useCallback(() => {
    alert("部屋が削除されました。");
  }, []);
  const { updatedRoom } = useSubscribeRoom({
    id: roomId,
    onUpdate: onRoomUpdate,
    onDelete: onRoomDelete,
  });

  const room = updatedRoom ?? roomQuery.data!;
  const players = room.players;

  const [playerId, setPlayerId] = useState(
    () => getStorageRoom(roomId)?.playerId
  );
  const onCreatePlayer = (newPlayerId: string) => {
    setPlayerId(newPlayerId);
    setStorageRoom(room, newPlayerId);
  };
  const player = players.find((p) => p.id === playerId);

  if (player === undefined) {
    return <NewPlayer room={room} onSubmit={onCreatePlayer} />;
  }

  return <RoomBoard room={room} player={player} />;
};
