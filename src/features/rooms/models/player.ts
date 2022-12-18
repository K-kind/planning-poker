import { Player, PlayerRow } from "@/features/rooms/types/player";
import { RoomRow } from "@/features/rooms/types/room";
import { add } from "@/shared/utils/date";

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
        typeof row.created_at === "string" &&
        typeof row.last_accessed_at === "string"
      );
    })
    .map((row) => {
      const value = row as any as PlayerRow;
      return {
        id: value.id,
        name: value.name,
        number: value.number,
        createdAt: new Date(value.created_at),
        lastAccessedAt: new Date(value.last_accessed_at),
      };
    });
};

export const toPlayerRow = (player: Player): PlayerRow => {
  return {
    id: player.id,
    name: player.name,
    number: player.number,
    created_at: player.createdAt.toUTCString(),
    last_accessed_at: player.lastAccessedAt.toUTCString(),
  };
};

export const isActive = (player: Player) => {
  return new Date() <= add(player.lastAccessedAt, { hours: 3 });
};
