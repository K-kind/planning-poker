import { supabase } from "@/lib/supabase";
import { CreateRoomUser, FUNCTION_NAME } from "@/shared/types/functions";

export type CreateRoomUserDTO = {
  params: { roomId: string };
};

export const createRoomUser = async ({ params }: CreateRoomUserDTO) => {
  const body: CreateRoomUser["requestBody"] = { room_id: params.roomId };
  const { data, error } = await supabase.functions.invoke<
    CreateRoomUser["responseData"]
  >(FUNCTION_NAME.createRoomUser, { body });
  if (error) throw error;

  const roomUser = data?.data;
  if (roomUser === undefined) throw new Error("Error creating a roomUser");

  return roomUser;
};
