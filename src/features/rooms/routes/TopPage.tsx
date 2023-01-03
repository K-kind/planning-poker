import { Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Flex, Loader } from "@mantine/core";
import { NewRoomForm } from "@/features/rooms/components/NewRoomForm";
import { Room } from "@/features/rooms/types/room";
import { RoomHistories } from "@/features/rooms/components/RoomHistories";

export const TopRoom = () => {
  const navigate = useNavigate();

  const onCreateRoom = async (room: Room) => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Flex justify="center">
      <Flex
        direction="column"
        align="center"
        pt={{ base: "xl", md: 32 }}
        w="50%"
      >
        <NewRoomForm onSubmit={onCreateRoom} />

        <Divider
          w="100%"
          mt={56}
          mb="md"
          label="過去に参加した部屋"
          labelPosition="center"
          labelProps={{ size: "sm" }}
        />
        <Suspense fallback={<Loader />}>
          <RoomHistories />
        </Suspense>
      </Flex>
    </Flex>
  );
};
