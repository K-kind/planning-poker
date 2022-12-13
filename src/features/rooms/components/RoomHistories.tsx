import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Table, Text } from "@mantine/core";
import { useRooms } from "@/features/rooms/api/getRooms";
import { AuthContext } from "@/providers/auth";

export const RoomHistories = () => {
  const { user } = useContext(AuthContext);
  const roomsQuery = useRooms({ config: { enabled: user != null } });

  const rooms = useMemo(() => {
    return (roomsQuery.data ?? []).map((room) => ({
      id: room.id,
      name: room.name,
      path: `/rooms/${room.id}`,
      createdAt: new Date(room.createdAt).toLocaleDateString(),
    }));
  }, [roomsQuery.data]);

  if (rooms.length === 0) {
    return <Text size="sm">過去に参加した部屋はありません。</Text>;
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>部屋名</th>
          <th>作成日</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <td>
              <Box
                component={Link}
                to={room.path}
                sx={{ display: "block", width: "100%", height: "100%" }}
              >
                {room.name}
              </Box>
            </td>
            <td>{room.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
