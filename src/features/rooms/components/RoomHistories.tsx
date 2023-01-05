import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, Table, Text } from "@mantine/core";
import { useRooms } from "@/features/rooms/api/getRooms";
import { AuthContext } from "@/providers/auth";
import { formatYMD } from "@/shared/utils/date";
import { RoomHistoryClipButton } from "@/features/rooms/components/RoomHistoryClipButton";

export const RoomHistories = () => {
  const { user } = useContext(AuthContext);
  const roomsQuery = useRooms({ config: { enabled: user != null } });

  const rooms = useMemo(() => {
    return (roomsQuery.data ?? []).map((room) => ({
      id: room.id,
      name: room.name,
      path: `/rooms/${room.id}`,
      createdAt: formatYMD(room.createdAt, "ja"),
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
              <Flex align="center">
                <Box
                  component={Link}
                  to={room.path}
                  sx={{ display: "block", width: "100%", height: "100%" }}
                  c="blue"
                >
                  {room.name}
                </Box>
                <Box mr={{ lg: "lg" }}>
                  <RoomHistoryClipButton path={room.path} />
                </Box>
              </Flex>
            </td>
            <td width="30%">{room.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
