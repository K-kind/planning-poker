import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { RoomUpdateParams } from "@/features/rooms/types/room";
import { toRoomRow } from "@/features/rooms/models/room";

export type UpdateRoomDTO = {
  id: string;
  params: RoomUpdateParams;
};

export const updateRoom = async ({ id, params }: UpdateRoomDTO) => {
  const { error } = await supabase
    .from("rooms")
    .update(toRoomRow(params))
    .eq("id", id);
  if (error) throw error;
};

type Options = {
  id: string;
};

export const useUpdateRoom = ({ id }: Options) => {
  return useMutation({
    mutationFn: (params: UpdateRoomDTO["params"]) => updateRoom({ id, params }),
  });
};
