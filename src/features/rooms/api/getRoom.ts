import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room } from "@/features/rooms/types/room";
import { AuthContext, ContextValue } from "@/providers/auth";
import { anonSignUp } from "@/features/auth/api/anonSignUp";
import { createRoomUser } from "@/features/roomUsers/api/createRoomUser";
import { ExtractFnReturnType, QueryConfig } from "@/lib/reactQuery";

export type getRoomDTO = {
  id: string;
  user: ContextValue["user"];
};

export const getRoom = async ({ id, user }: getRoomDTO): Promise<Room> => {
  // RoomUser is required to access Room data.
  await fetchOrCreateRoomUser({ id, user });

  const { data, error } = await supabase.from("rooms").select("*").eq("id", id);
  if (error) throw error;
  if (data.length === 0) throw new Error("Invalid roomId");

  return parseRoom(data[0]);
};

const fetchOrCreateRoomUser = async ({ id, user }: getRoomDTO) => {
  if (user == null) await anonSignUp();
  await createRoomUser({ params: { roomId: id } });
};

type QueryFnType = typeof getRoom;

type Options = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useRoom = ({ id, config }: Options) => {
  const { user } = useContext(AuthContext);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["room", id],
    queryFn: () => getRoom({ id, user }),
    retry: false,
    ...config,
  });
};
