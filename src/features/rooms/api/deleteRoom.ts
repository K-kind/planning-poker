import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type DeleteRoomDTO = {
  params: { id: string };
};

// room_users are automatically deleted by constraints
export const deleteRoom = async ({ params }: DeleteRoomDTO) => {
  const { error } = await supabase.from("rooms").delete().eq("id", params.id);
  if (error) throw error;
};

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: (params: DeleteRoomDTO["params"]) => deleteRoom({ params }),
  });
};
