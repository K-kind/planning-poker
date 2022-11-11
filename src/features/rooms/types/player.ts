export type PlayerRow = {
  id: string;
  name: string;
  number: number | null;
  created_at: string;
};

export type Player = {
  id: PlayerRow["id"];
  name: PlayerRow["name"];
  number: PlayerRow["number"];
  createdAt: Date;
};

export type PlayerCreateParams = Pick<Player, "name"> & Partial<Player>;

export type PlayerUpdateParams = Partial<Player>;
