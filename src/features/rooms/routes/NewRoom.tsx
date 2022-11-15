import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Divider, Flex, List, Text } from "@mantine/core";
import { useCreateRoom } from "@/features/rooms/api/createRoom";
import { getStorageRooms } from "@/features/rooms/models/room";

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

  const rooms = useMemo(() => {
    const roomsMap = getStorageRooms();
    return Object.entries(roomsMap)
      .sort(([, a], [, b]) => {
        // 作成日降順
        if (a.createdAt < b.createdAt) return 1;
        if (a.createdAt > b.createdAt) return -1;
        return 0;
      })
      .map(([roomId, room]) => {
        return {
          id: roomId,
          path: `/rooms/${roomId}`,
          createdAt: new Date(room.createdAt).toLocaleString(),
        };
      });
  }, []);

  return (
    <Flex justify="center">
      <Flex
        direction="column"
        align="center"
        pt={{ base: "xl", md: 32 }}
        w="50%"
      >
        <Box>
          <Button size="md" onClick={onClick}>
            部屋を作成する
          </Button>
        </Box>

        <Divider
          w="100%"
          mt={56}
          mb="md"
          label="過去に参加した部屋"
          labelPosition="center"
          labelProps={{ size: "sm" }}
        />

        <List>
          {rooms.map((room) => (
            <List.Item key={room.id} lh={2}>
              <Link to={room.path}>
                <Text>作成日: {room.createdAt}</Text>
              </Link>
            </List.Item>
          ))}
        </List>
      </Flex>
    </Flex>
  );
};
