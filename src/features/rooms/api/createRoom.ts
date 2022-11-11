import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { RoomCreateParams } from "@/features/rooms/types/room";
import { parseRoom, toRoomRow } from "@/features/rooms/models/room";

export type CreateRoomDTO = {
  data: RoomCreateParams;
};

export const createRoom = async ({ data }: CreateRoomDTO) => {
  const { data: insertedData, error } = await supabase
    .from("rooms")
    .insert(toRoomRow(data))
    .select("*");
  if (error) throw error;
  if (insertedData[0] === undefined) throw new Error("Error inserting a room");

  return parseRoom(insertedData[0]);
};

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (data: CreateRoomDTO["data"]) => createRoom({ data }),
  });
};
