import { useMutation } from "@tanstack/react-query";
import { Player, PlayerCreateParams } from "@/features/rooms/types/player";
import { updateRoom } from "@/features/rooms/api/updateRoom";
import { Room } from "@/features/rooms/types/room";
import { uuid } from "@/shared/utils/uuid";

export type createPlayerDTO = {
  room: Room;
  data: PlayerCreateParams;
};

export const createPlayer = async ({ room, data }: createPlayerDTO) => {
  const newPlayer: Player = {
    id: data.id ?? uuid(),
    name: data.name,
    number: data.number ?? null,
    createdAt: data.createdAt ?? new Date(),
  };
  const players = [...room.players, newPlayer].sort((a, b) => {
    if (a.createdAt < b.createdAt) return -1;
    if (a.createdAt > b.createdAt) return 1;
    return 0;
  });
  await updateRoom({ id: room.id, data: { players } });
  return newPlayer;
};

type Options = {
  room: Room;
};

export const useCreatePlayer = ({ room }: Options) => {
  return useMutation({
    mutationFn: (data: createPlayerDTO["data"]) => createPlayer({ room, data }),
  });
};
