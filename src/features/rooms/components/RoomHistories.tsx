import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { List, Text } from "@mantine/core";
import { useRooms } from "@/features/rooms/api/getRooms";
import { AuthContext } from "@/providers/auth";

export const RoomHistories = () => {
  const { user } = useContext(AuthContext);
  const roomsQuery = useRooms({ config: { enabled: user != null } });

  const rooms = useMemo(() => {
    return (roomsQuery.data ?? []).map((room) => ({
      id: room.id,
      path: `/rooms/${room.id}`,
      createdAt: new Date(room.createdAt).toLocaleString(),
    }));
  }, [roomsQuery.data]);

  return (
    <List>
      {rooms.map((room) => (
        <List.Item key={room.id} lh={2}>
          <Link to={room.path}>
            <Text>作成日: {room.createdAt}</Text>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};
