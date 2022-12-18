import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
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

  const room = roomQuery.data!;
  const players = room.players;
  const player = players.find((p) => p.id === user!.id);

  const queryClient = useQueryClient();

  useSubscribeRoom({
    id: roomId,
    onUpdate: useMemo(
      () => (room) => queryClient.setQueryData(["room", room.id], () => room),
      [queryClient]
    ),
    onDelete: useMemo(() => () => alert("部屋が削除されました。"), []),
  });

  if (player === undefined) {
    return <NewPlayerForm room={room} />;
  }

  return <RoomBoard room={room} player={player} />;
};
