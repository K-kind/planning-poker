export type PlayerRow = {
  id: string;
  name: string;
  number: number | null;
  created_at: string;
  last_accessed_at: string;
};

export type Player = {
  id: PlayerRow["id"];
  name: PlayerRow["name"];
  number: PlayerRow["number"];
  createdAt: Date;
  lastAccessedAt: Date;
};

export type PlayerCreateParams = Pick<Player, "id" | "name"> & Partial<Player>;

export type PlayerUpdateParams = Partial<Player>;
