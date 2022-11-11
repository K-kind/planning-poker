import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { RoomUpdateParams } from "@/features/rooms/types/room";
import { toRoomRow } from "@/features/rooms/models/room";

export type UpdateRoomDTO = {
  id: string;
  data: RoomUpdateParams;
};

export const updateRoom = async ({ id, data }: UpdateRoomDTO) => {
  const { error } = await supabase
    .from("rooms")
    .update(toRoomRow(data))
    .eq("id", id);
  if (error) throw error;
};

type Options = {
  id: string;
};

export const useUpdateRoom = ({ id }: Options) => {
  return useMutation({
    mutationFn: (data: UpdateRoomDTO["data"]) => updateRoom({ id, data }),
  });
};
