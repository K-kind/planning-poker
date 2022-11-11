import { useState } from "react";
import { Room } from "@/features/rooms/types/room";
import { useCreatePlayer } from "@/features/rooms/api/createPlayer";

type Props = {
  room: Room;
  onSubmit: (playerId: string) => void;
};

export const NewPlayer = ({ room, onSubmit }: Props) => {
  const [name, setName] = useState("");

  const createPlayerMutation = useCreatePlayer({ room });

  const handleClick = async () => {
    try {
      const player = await createPlayerMutation.mutateAsync({ name });
      onSubmit(player.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleClick}>送信</button>
      </div>
    </div>
  );
};
