import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room } from "@/features/rooms/types/room";
import { createRoomUser } from "@/features/roomUsers/api/createRoomUser";
import { ExtractFnReturnType, QueryConfig } from "@/lib/reactQuery";
import { useRoomUserByRoom } from "@/features/roomUsers/api/getRoomUserByRoom";

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
  const queryClient = useQueryClient();

  const useRoomUserByRoomQuery = useRoomUserByRoom({
    roomId: id,
    config: { staleTime: 5 * 60 * 1000 }, // 5 minutes
  });

  const queryFn = useCallback(async () => {
    // RoomUser is required to access Room data.
    if (useRoomUserByRoomQuery.data == null) {
      const roomUser = await createRoomUser({ params: { roomId: id } });
      queryClient.setQueryData(["roomUserByRoom", id], () => roomUser);
    }

    return await getRoom({ id });
  }, [id, useRoomUserByRoomQuery.data, queryClient]);

  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["room", id],
    queryFn,
    retry: false,
    ...config,
  });
};
