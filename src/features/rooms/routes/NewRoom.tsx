import { useNavigate } from "react-router-dom";
import { Button, Flex } from "@mantine/core";
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
    <Flex direction="column" align="center" pt={{ base: "xl", md: 32 }}>
      <Button size="md" onClick={onClick}>
        部屋を作成する
      </Button>
    </Flex>
  );
};
