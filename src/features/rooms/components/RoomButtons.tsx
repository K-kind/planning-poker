import { Room } from "@/features/rooms/types/room";
import { Button, SegmentedControl } from "@mantine/core";

type Props = {
  cardStatus: Room["cardStatus"];
  loading?: boolean;
  onChangeStatus: (cardStatus: Room["cardStatus"]) => void;
  onClickReset: () => void;
};

export const RoomButtons = ({
  cardStatus,
  loading = false,
  onChangeStatus,
  onClickReset,
}: Props) => {
  return (
    <div>
      <SegmentedControl
        value={cardStatus}
        onChange={onChangeStatus}
        data={[
          { label: "Open", value: "open" },
          { label: "Hide", value: "hidden" },
        ]}
        disabled={loading}
      />
      <Button disabled={loading} onClick={onClickReset}>
        リセット
      </Button>
    </div>
  );
};
