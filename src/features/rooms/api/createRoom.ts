import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { RoomCreateParams } from "@/features/rooms/types/room";
import { parseRoom, toRoomRow } from "@/features/rooms/models/room";
import { CreateRoom, FUNCTION_NAME } from "@/shared/types/functions";

export type CreateRoomDTO = {
  params: RoomCreateParams;
};

export const createRoom = async ({ params }: CreateRoomDTO) => {
  const body: CreateRoom["requestBody"] = toRoomRow(params);
  const { data, error } = await supabase.functions.invoke<
    CreateRoom["responseData"]
  >(FUNCTION_NAME.createRoom, { body });
  if (error) throw error;

  const room = data?.data;
  if (room === undefined) throw new Error("Error creating a room");

  return parseRoom(room);
};

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (params: CreateRoomDTO["params"]) => createRoom({ params }),
  });
};
