import { useCallback } from "react";
import { Button, Tooltip } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy } from "@tabler/icons";

type Props = {
  path: string;
};

export const RoomHistoryClipButton = ({ path }: Props) => {
  const clipboard = useClipboard({ timeout: 500 });

  const onClick = useCallback(() => {
    const url = `${window.location.origin}${path}`;
    clipboard.copy(url);
  }, [path, clipboard]);

  return (
    <Tooltip label="URLをコピー" withArrow>
      <Button
        size="xs"
        variant="subtle"
        color={clipboard.copied ? "cyan" : "blue"}
        px="xs"
        onClick={onClick}
      >
        <IconCopy />
      </Button>
    </Tooltip>
  );
};
