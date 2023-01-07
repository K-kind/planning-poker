import { useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useRoom } from "@/features/rooms/api/getRoom";
import { useSubscribeRoom } from "@/features/rooms/api/subscribeRoom";
import { NewPlayerBoard } from "@/features/rooms/components/NewPlayerBoard";
import { RoomBoard } from "@/features/rooms/components/RoomBoard";
import { AuthContext } from "@/providers/auth";
import { useEnsureSignIn } from "@/features/auth/api/ensureSignIn";

export const RoomPage = () => {
  const params = useParams();

  useEnsureSignIn();

  const roomId = params.id!;
  const roomQuery = useRoom({ id: roomId });
  const { user } = useContext(AuthContext);

  const room = roomQuery.data!;
  const players = room.players;
  const player = players.find((p) => p.id === user!.id);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useSubscribeRoom({
    id: roomId,
    onUpdate: useMemo(
      () => (room) => queryClient.setQueryData(["room", room.id], () => room),
      [queryClient]
    ),
    onDelete: useMemo(
      () => () => {
        alert("部屋が削除されました。");
        navigate("/");
      },
      [navigate]
    ),
  });

  if (player === undefined) {
    return <NewPlayerBoard room={room} />;
  }

  return <RoomBoard room={room} player={player} />;
};
