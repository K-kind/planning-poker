import { RoomInsertRow, RoomRow } from "@/features/rooms/types/room";
import { RoomUserRow } from "@/features/roomUsers/types/roomUser";

export const FUNCTION_NAME = {
  createRoom: "create-room",
  createRoomUser: "create-room-user",
  createRequest: "create-request",
} as const;

export type CreateRoom = {
  requestBody: RoomInsertRow;
  responseData: { data: RoomRow };
};

export type CreateRoomUser = {
  requestBody: { room_id: string };
  responseData: { data: RoomUserRow };
};

export type CreateRequest = {
  requestBody: { content: string };
  responseData: { data: null };
};
