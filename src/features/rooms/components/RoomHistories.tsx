import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Box, Button, Flex, Table, Text, Tooltip } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { useRooms } from "@/features/rooms/api/getRooms";
import { AuthContext } from "@/providers/auth";
import { formatYMD } from "@/shared/utils/date";
import { RoomHistoryClipButton } from "@/features/rooms/components/RoomHistoryClipButton";
import { useDeleteRoom } from "@/features/rooms/api/deleteRoom";
import { useNotification } from "@/shared/hooks/useNotification";
import { Player } from "@/features/rooms/types/player";
import { useModal } from "@/shared/hooks/useModal";
import { captureException } from "@/lib/sentry";

type RoomItem = {
  id: string;
  name: string;
  path: string;
  createdAt: string;
  players: Player[];
};

export const RoomHistories = () => {
  const { user } = useContext(AuthContext);
  const roomsQuery = useRooms({ config: { enabled: user != null } });

  const queryClient = useQueryClient();
  const { confirm } = useModal();
  const { notifySuccess, notifyError } = useNotification();

  const deleteRoomMutation = useDeleteRoom();

  const handleDelete = async (room: RoomItem) => {
    const playerNames = room.players.map(({ name }) => `・${name}`).join("\n");
    const message = `「${room.name}」を削除してもよろしいですか？\n\nこの部屋のプレイヤー（${room.players.length}人）\n${playerNames}`;
    const confirmed = await confirm({ message: message.slice(0, 300) });
    if (!confirmed) return;

    try {
      await deleteRoomMutation.mutateAsync({ id: room.id });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      notifySuccess({ message: "部屋を削除しました。" });
    } catch (e) {
      captureException(e);
      notifyError();
    }
  };

  const rooms = useMemo<RoomItem[]>(() => {
    return (roomsQuery.data ?? []).map((room) => ({
      id: room.id,
      name: room.name,
      path: `/rooms/${room.id}`,
      createdAt: formatYMD(room.createdAt, "ja"),
      players: room.players,
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
          <th></th>
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
                  sx={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    flexBasis: "60%",
                  }}
                  c="blue"
                >
                  {room.name}
                </Box>
                <Box mr={{ lg: "xl" }}>
                  <RoomHistoryClipButton path={room.path} />
                </Box>
              </Flex>
            </td>
            <td width="30%">{room.createdAt}</td>
            <td width="15%">
              <Flex align="center" justify="flex-end">
                <Tooltip label="部屋を削除" withArrow>
                  <Button
                    size="xs"
                    color="red"
                    variant="subtle"
                    onClick={() => handleDelete(room)}
                    loading={deleteRoomMutation.isLoading}
                  >
                    <IconTrash />
                  </Button>
                </Tooltip>
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
