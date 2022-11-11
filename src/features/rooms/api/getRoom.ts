import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room } from "@/features/rooms/types/room";

export const getRoom = async (id: string): Promise<Room | undefined> => {
  const { data, error } = await supabase.from("rooms").select("*").eq("id", id);
  if (error) throw error;

  return data[0] && parseRoom(data[0]);
};

type Options = {
  id: string;
};

export const useRoom = ({ id }: Options) => {
  return useQuery({ queryKey: ["room", id], queryFn: () => getRoom(id) });
};
