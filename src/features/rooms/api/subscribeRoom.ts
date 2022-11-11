import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room, RoomRow } from "@/features/rooms/types/room";

type UseSubscribeRoomOptions = {
  id: string;
  onUpdate?: (room: Room) => void;
  onDelete?: () => void;
};

export const useSubscribeRoom = ({
  id,
  onUpdate,
  onDelete,
}: UseSubscribeRoomOptions) => {
  const [updatedRoom, setUpdatedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`public:rooms:id=eq.${id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          const roomRow = payload.new as RoomRow;
          const room = parseRoom(roomRow);
          setUpdatedRoom(room);
          onUpdate?.(room);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "rooms",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Delete received!", payload);
          onDelete?.();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, onUpdate, onDelete]);

  return { updatedRoom };
};
