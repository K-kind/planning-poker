import { Button, Flex, Sx } from "@mantine/core";
import { IconPlayCard, IconPlayCardOff, IconTrash } from "@tabler/icons";
import { Room } from "@/features/rooms/types/room";

type Props = {
  cardStatus: Room["cardStatus"];
  loading?: boolean;
  sx?: Sx;
  onChangeStatus: (cardStatus: Room["cardStatus"]) => void;
  onClickReset: () => void;
};

export const RoomButtons = ({
  cardStatus,
  loading = false,
  sx,
  onChangeStatus,
  onClickReset,
}: Props) => {
  return (
    <Flex columnGap={24} sx={sx}>
      {cardStatus === "hidden" ? (
        <Button
          variant="light"
          leftIcon={<IconPlayCard size={16} />}
          w={150}
          styles={() => ({
            leftIcon: {
              marginRight: 4,
            },
          })}
          sx={{ pointerEvents: loading ? "none" : undefined }}
          onClick={() => onChangeStatus("open")}
        >
          カードをめくる
        </Button>
      ) : (
        <Button
          variant="light"
          color="gray"
          leftIcon={<IconPlayCardOff size={16} />}
          w={150}
          styles={() => ({
            leftIcon: {
              marginRight: 4,
            },
          })}
          sx={{ pointerEvents: loading ? "none" : undefined }}
          onClick={() => onChangeStatus("hidden")}
        >
          カードを伏せる
        </Button>
      )}

      <Button
        variant="light"
        color="red"
        leftIcon={<IconTrash size={16} />}
        w={108}
        styles={() => ({
          leftIcon: {
            marginRight: 4,
          },
        })}
        sx={{ pointerEvents: loading ? "none" : undefined }}
        onClick={onClickReset}
      >
        リセット
      </Button>
    </Flex>
  );
};
