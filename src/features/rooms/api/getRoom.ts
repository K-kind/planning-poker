import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room } from "@/features/rooms/types/room";

export const getRoom = async (id: string): Promise<Room> => {
  const { data, error } = await supabase.from("rooms").select("*").eq("id", id);
  if (error) throw error;
  if (data.length === 0) throw new Error("Invalid roomId");

  return parseRoom(data[0]);
};

type Options = {
  id: string;
};

export const useRoom = ({ id }: Options) => {
  return useQuery({
    queryKey: ["room", id],
    queryFn: () => getRoom(id),
    retry: false,
  });
};
