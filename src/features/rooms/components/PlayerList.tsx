import { useState } from "react";
import { Button, Flex, List, Popover, Text, Tooltip } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import styled from "@emotion/styled";
import { Room } from "@/features/rooms/types/room";
import { useNotification } from "@/shared/hooks/useNotification";
import { useModal } from "@/shared/hooks/useModal";
import { Player } from "@/features/rooms/types/player";
import { useDeletePlayer } from "@/features/rooms/api/deletePlayer";
import { isActive } from "@/features/rooms/models/player";
import { formatYMDMH } from "@/shared/utils/date";

type Props = {
  room: Room;
  me: Player;
};

export const PlayerList = ({ room, me }: Props) => {
  const { notifySuccess } = useNotification();
  const { confirm } = useModal();
  const deletePlayerMutation = useDeletePlayer({ room });

  const [poptargetPlayerId, setPoptargetPlayerId] = useState<
    string | undefined
  >();

  const handleExit = async (player: Player) => {
    const message =
      player.id === me.id
        ? "退室しますか？"
        : `${player.name}さんを退室させますか？`;
    const confirmed = await confirm({ message });
    if (!confirmed) return;

    try {
      await deletePlayerMutation.mutateAsync({ id: player.id });
    } catch (e) {
      console.error(e);
      return;
    }

    notifySuccess({ message: "変更を保存しました。" });
  };

  const getNameColor = (player: Player) => {
    if (!isActive(player)) return "dark.0";
    if (player.id === me.id) return "blue";
    return undefined;
  };

  return (
    <List spacing="xs" withPadding>
      {room.players.map((player) => (
        <StyledListItem key={player.id}>
          <Flex justify="space-between" align="center">
            <Popover
              position="bottom-start"
              withArrow
              shadow="md"
              opened={poptargetPlayerId === player.id}
            >
              <Popover.Target>
                <Text
                  onMouseEnter={() => setPoptargetPlayerId(player.id)}
                  onMouseLeave={() => setPoptargetPlayerId(undefined)}
                  c={getNameColor(player)}
                  sx={{ flexGrow: 1 }}
                >
                  {player.name}
                </Text>
              </Popover.Target>
              <Popover.Dropdown sx={{ pointerEvents: "none" }}>
                <Text size="sm">
                  最終アクセス: {formatYMDMH(player.lastAccessedAt, "ja")}
                </Text>
              </Popover.Dropdown>
            </Popover>

            <Tooltip
              label={player.id === me.id ? "退室する" : "退室させる"}
              withArrow
            >
              <Button
                variant="subtle"
                size="xs"
                color="red"
                onClick={() => handleExit(player)}
              >
                <IconLogout />
              </Button>
            </Tooltip>
          </Flex>
        </StyledListItem>
      ))}
    </List>
  );
};

const StyledListItem = styled(List.Item)`
  & .mantine-List-itemWrapper {
    width: calc(100% - 32px);
  }
  & > span {
    width: 100%;
  }
`;
