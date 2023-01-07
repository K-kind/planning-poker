import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { parseRoom } from "@/features/rooms/models/room";
import { Room, RoomRow } from "@/features/rooms/types/room";
import { captureException } from "@/lib/sentry";

type UseSubscribeRoomOptions = {
  id: string;
  onConnected?: () => void;
  onError?: (error: Error | undefined) => void;
  onUpdate?: (room: Room) => void;
  onDelete?: () => void;
};

export const useSubscribeRoom = ({
  id,
  onConnected,
  onError,
  onUpdate,
  onDelete,
}: UseSubscribeRoomOptions) => {
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
          const roomRow = payload.new as RoomRow;
          const room = parseRoom(roomRow);
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
        () => {
          onDelete?.();
        }
      )
      .subscribe((status, err) => {
        if (status === "SUBSCRIBED") {
          onConnected?.();
        }

        if (status === "CHANNEL_ERROR") {
          captureException(err);
          onError?.(err);
        }

        if (status === "TIMED_OUT") {
          console.error("Realtime server did not respond in time.");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, onConnected, onError, onUpdate, onDelete]);
};
