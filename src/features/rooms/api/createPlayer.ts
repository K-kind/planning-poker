import { useMutation } from "@tanstack/react-query";
import { Player, PlayerCreateParams } from "@/features/rooms/types/player";
import { updateRoom } from "@/features/rooms/api/updateRoom";
import { Room } from "@/features/rooms/types/room";
import { uuid } from "@/shared/utils/uuid";

export type createPlayerDTO = {
  room: Room;
  params: PlayerCreateParams;
};

export const createPlayer = async ({ room, params }: createPlayerDTO) => {
  const newPlayer: Player = {
    id: params.id ?? uuid(),
    name: params.name,
    number: params.number ?? null,
    createdAt: params.createdAt ?? new Date(),
    lastAccessedAt: params.lastAccessedAt ?? new Date(),
  };
  const players = [...room.players, newPlayer].sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
  });
  await updateRoom({ id: room.id, params: { players } });
  return newPlayer;
};

type Options = {
  room: Room;
};

export const useCreatePlayer = ({ room }: Options) => {
  return useMutation({
    mutationFn: (params: createPlayerDTO["params"]) =>
      createPlayer({ room, params }),
  });
};
