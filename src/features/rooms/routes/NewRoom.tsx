import { useNavigate } from "react-router-dom";
import { useCreateRoom } from "@/features/rooms/api/createRoom";

export const NewRoom = () => {
  const navigate = useNavigate();
  const createRoomMutation = useCreateRoom();

  const onClick = async () => {
    createRoomMutation.mutate(
      {},
      {
        onSuccess(room) {
          navigate(`/rooms/${room.id}`);
        },
      }
    );
  };

  return (
    <div>
      <button onClick={onClick}>部屋を作成する</button>
    </div>
  );
};
