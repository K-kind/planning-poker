import { Database } from "@/../generated-schema";

export type RoomUserRow = Database["public"]["Tables"]["room_users"]["Row"];

export type RoomUser = {
  id: RoomUserRow["id"];
  roomId: RoomUserRow["room_id"];
  userId: RoomUserRow["user_id"];
};
