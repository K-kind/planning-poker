import { Button, Flex, Sx, Text, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconHelp, IconSettings } from "@tabler/icons";
import { Room } from "@/features/rooms/types/room";

type Props = {
  room: Room;
  openSettings: () => void;
  openHelp: () => void;
  sx?: Sx;
};

export const RoomHeader = ({ room, openSettings, openHelp, sx }: Props) => {
  const clipboard = useClipboard({ timeout: 500 });
  const onClickCopy = () => {
    clipboard.copy(window.location.href);
  };

  return (
    <Flex justify="space-between" align="center" wrap="wrap" sx={sx}>
      <Text fz="lg" sx={{ lineHeight: "30px" }}>
        {room.name}
      </Text>
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
            ml={{ sm: "sm" }}
            color="gray"
            onClick={openSettings}
          >
            <IconSettings />
          </Button>
        </Tooltip>
        <Tooltip label="ヘルプ" withArrow>
          <Button
            variant="subtle"
            size="xs"
            ml={{ sm: "sm" }}
            color="gray"
            onClick={openHelp}
          >
            <IconHelp />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
