import { Button, Flex, Sx, Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconSettings } from "@tabler/icons";
import { Room } from "@/features/rooms/types/room";

type Props = {
  room: Room;
  openDrawer: () => void;
  sx?: Sx;
};

export const RoomHeader = ({ room, openDrawer, sx }: Props) => {
  const clipboard = useClipboard({ timeout: 500 });
  const onClickCopy = () => {
    clipboard.copy(window.location.href);
  };

  return (
    <Flex justify="space-between" align="center" sx={sx}>
      <Text fz="lg">{room.name}</Text>
      <Flex align="center">
        <Tooltip label="URLをコピー" withArrow>
          <Button
            variant="subtle"
            size="xs"
            color={clipboard.copied ? "blue" : "gray"}
            onClick={onClickCopy}
          >
            <IconCopy />
          </Button>
        </Tooltip>
        <Tooltip label="ルーム設定" withArrow>
          <Button
            variant="subtle"
            size="xs"
            ml="sm"
            color="gray"
            onClick={openDrawer}
          >
            <IconSettings />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
