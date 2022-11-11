import { Player, PlayerRow } from "@/features/rooms/types/player";
import { RoomRow } from "@/features/rooms/types/room";
import { getStorageItem, setStorageItem } from "@/lib/local-storage";

export const parsePlayers = (rowPlayers: RoomRow["players"]): Player[] => {
  if (!Array.isArray(rowPlayers)) return [];

  return rowPlayers
    .filter((row) => {
      return (
        row !== null &&
        typeof row === "object" &&
        !Array.isArray(row) &&
        typeof row.id === "string" &&
        typeof row.name === "string" &&
        (row.number === null || typeof row.number === "number") &&
        typeof row.created_at === "string"
      );
    })
    .map((row) => {
      const value = row as any as PlayerRow;
      return {
        id: value.id,
        name: value.name,
        number: value.number,
        createdAt: new Date(value.created_at),
      };
    });
};

export const toPlayerRow = (player: Player): PlayerRow => {
  return {
    id: player.id,
    name: player.name,
    number: player.number,
    created_at: player.createdAt.toUTCString(),
  };
};

export const getCurrentPlayerId = (roomId: string) => {
  const roomUserMap = getStorageItem("ROOM_USER");
  return roomUserMap?.[roomId];
};

export const setCurrentPlayerId = (roomId: string, playerId: string) => {
  const roomUserMap = getStorageItem("ROOM_USER") ?? {};
  setStorageItem("ROOM_USER", { ...roomUserMap, [roomId]: playerId });
};
