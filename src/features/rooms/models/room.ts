import { parsePlayers, toPlayerRow } from "@/features/rooms/models/player";
import {
  Room,
  RoomCreateParams,
  RoomInsertRow,
  RoomRow,
  RoomUpdateParams,
  RoomUpdateRow,
} from "@/features/rooms/types/room";

export const parseRoom = (row: RoomRow): Room => {
  return {
    id: row.id,
    cardStatus: row.card_status,
    cards: row.cards,
    players: parsePlayers(row.players),
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  };
};

export function toRoomRow(room: Room): RoomRow;
export function toRoomRow(room: RoomCreateParams): RoomInsertRow;
export function toRoomRow(room: RoomUpdateParams): RoomUpdateRow;
export function toRoomRow(room: Partial<Room>): Partial<RoomRow> {
  return {
    id: room.id,
    card_status: room.cardStatus,
    cards: room.cards,
    players: room.players?.map(toPlayerRow),
    created_at: room.createdAt?.toUTCString(),
    updated_at: room.updatedAt?.toUTCString(),
  };
}
