import { useMutation } from "@tanstack/react-query";
import { updateRoom } from "@/features/rooms/api/updateRoom";
import { Room } from "@/features/rooms/types/room";

export type DeletePlayerDTO = {
  id: string;
  room: Room;
};

export const deletePlayer = async ({ id, room }: DeletePlayerDTO) => {
  const player = room.players.find((p) => p.id === id);
  if (player === undefined) throw new Error("Invalid player ID");

  const updatedPlayers = room.players.filter((p) => p.id !== id);
  await updateRoom({ id: room.id, params: { players: updatedPlayers } });
};

type Options = {
  room: Room;
};

export const useDeletePlayer = ({ room }: Options) => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deletePlayer({ id, room }),
  });
};
