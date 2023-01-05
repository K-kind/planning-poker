import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ExtractFnReturnType, QueryConfig } from "@/lib/reactQuery";
import { parseRoomUser } from "@/features/roomUsers/models/roomUser";
import { RoomUser } from "@/features/roomUsers/types/roomUser";

export type getRoomUserByRoomDTO = {
  roomId: string;
};

export const getRoomUserByRoom = async ({
  roomId,
}: getRoomUserByRoomDTO): Promise<RoomUser | null> => {
  const { data, error } = await supabase
    .from("room_users")
    .select("*")
    .eq("room_id", roomId);
  if (error) throw error;
  if (data.length === 0) return null;

  return parseRoomUser(data[0]);
};

type QueryFnType = typeof getRoomUserByRoom;

type Options = {
  roomId: string;
  config?: QueryConfig<QueryFnType>;
};

export const useRoomUserByRoom = ({ roomId, config }: Options) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["roomUserByRoom", roomId],
    queryFn: () => getRoomUserByRoom({ roomId }),
    retry: false,
    ...config,
  });
};
