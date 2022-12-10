import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room } from "@/features/rooms/types/room";
import { ExtractFnReturnType, QueryConfig } from "@/lib/reactQuery";

export const getRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return data.map(parseRoom);
};

type QueryFnType = typeof getRooms;

type Options = {
  config?: QueryConfig<QueryFnType>;
};

export const useRooms = ({ config }: Options = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    retry: false,
    ...config,
  });
};
