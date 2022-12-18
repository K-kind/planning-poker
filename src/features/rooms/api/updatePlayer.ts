import { useMutation } from "@tanstack/react-query";
import { Player, PlayerUpdateParams } from "@/features/rooms/types/player";
import { updateRoom } from "@/features/rooms/api/updateRoom";
import { Room } from "@/features/rooms/types/room";

export type UpdatePlayerDTO = {
  id: string;
  room: Room;
  params: PlayerUpdateParams;
};

export const updatePlayer = async ({ id, room, params }: UpdatePlayerDTO) => {
  const player = room.players.find((p) => p.id === id);
  if (player === undefined) throw new Error("Invalid player ID");

  const updatedPlayer: Player = {
    ...player,
    lastAccessedAt: new Date(),
    ...params,
  };
  const players = room.players
    .map((p) => {
      return p.id === id ? updatedPlayer : p;
    })
    .sort((a, b) => {
      if (a.createdAt < b.createdAt) return -1;
      if (a.createdAt > b.createdAt) return 1;
      return 0;
    });
  await updateRoom({ id: room.id, params: { players } });
  return updatedPlayer;
};

type Options = {
  id: string;
  room: Room;
};

export const useUpdatePlayer = ({ id, room }: Options) => {
  return useMutation({
    mutationFn: (params: UpdatePlayerDTO["params"]) =>
      updatePlayer({ id, room, params }),
  });
};
