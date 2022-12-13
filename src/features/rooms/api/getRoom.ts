import { useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room } from "@/features/rooms/types/room";
import { AuthContext } from "@/providers/auth";
import { useAnonSignUp } from "@/features/auth/api/anonSignUp";
import { createRoomUser } from "@/features/roomUsers/api/createRoomUser";
import { ExtractFnReturnType, QueryConfig } from "@/lib/reactQuery";

export type getRoomDTO = {
  id: string;
};

export const getRoom = async ({ id }: getRoomDTO): Promise<Room> => {
  const { data, error } = await supabase.from("rooms").select("*").eq("id", id);
  if (error) throw error;
  if (data.length === 0) throw new Error("Invalid roomId");

  return parseRoom(data[0]);
};

type QueryFnType = typeof getRoom;

type Options = {
  id: string;
  config?: QueryConfig<QueryFnType>;
};

export const useRoom = ({ id, config }: Options) => {
  const { user } = useContext(AuthContext);
  const anonSignUpMutation = useAnonSignUp();

  const queryFn = useCallback(async () => {
    // RoomUser is required to access Room data.
    if (user == null) await anonSignUpMutation.mutateAsync();
    await createRoomUser({ params: { roomId: id } });

    return await getRoom({ id });
  }, [user, id, anonSignUpMutation]);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["room", id],
    queryFn,
    retry: false,
    ...config,
  });
};
