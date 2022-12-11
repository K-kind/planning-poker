import { useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "@/features/rooms/api/getRoom";
import { useSubscribeRoom } from "@/features/rooms/api/subscribeRoom";
import { NewPlayerForm } from "@/features/rooms/components/NewPlayerForm";
import { RoomBoard } from "@/features/rooms/components/RoomBoard";
import { AuthContext } from "@/providers/auth";

export const RoomPage = () => {
  const params = useParams();
  const roomId = params.id!;
  const roomQuery = useRoom({ id: roomId });
  const { user } = useContext(AuthContext);

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
  const player = players.find((p) => p.id === user?.id);

  if (player === undefined) {
    return <NewPlayerForm room={room} />;
  }

  return <RoomBoard room={room} player={player} />;
};
