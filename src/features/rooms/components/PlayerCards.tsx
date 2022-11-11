import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";

type Props = {
  room: Room;
  player: Player;
};

export const PlayerCards = ({ room, player }: Props) => {
  const isOpen = room.cardStatus === "open";

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {room.players.map((p) => (
        <span
          key={p.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "grey",
            backgroundColor: isOpen ? undefined : "black",
          }}
        >
          <span>{p.number}</span>
          <span>{p.name}</span>
        </span>
      ))}
    </div>
  );
};
