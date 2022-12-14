import { Database } from "@/../generated-schema";
import { Player } from "@/features/rooms/types/player";

export type RoomRow = Database["public"]["Tables"]["rooms"]["Row"];
export type RoomInsertRow = Database["public"]["Tables"]["rooms"]["Insert"];
export type RoomUpdateRow = Database["public"]["Tables"]["rooms"]["Update"];

export type Room = {
  id: RoomRow["id"];
  name: RoomRow["name"];
  cardStatus: RoomRow["card_status"];
  cards: RoomRow["cards"];
  players: Player[];
  createdAt: Date;
  updatedAt: Date;
};

export type RoomCreateParams = Partial<Room> & { name: Room["name"] };
export type RoomUpdateParams = Partial<Room>;
