import { RoomUser, RoomUserRow } from "@/features/roomUsers/types/roomUser";

export const parseRoomUser = (row: RoomUserRow): RoomUser => {
  return {
    id: row.id,
    roomId: row.room_id,
    userId: row.user_id,
  };
};
