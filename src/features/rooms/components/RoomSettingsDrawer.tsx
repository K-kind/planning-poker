import { useEffect } from "react";
import { Button, Drawer, Flex, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Room } from "@/features/rooms/types/room";
import { roomFormSchema } from "@/features/rooms/schemas/roomForm";
import { useUpdateRoom } from "@/features/rooms/api/updateRoom";
import { useNotification } from "@/shared/hooks/useNotification";

type FormValues = { name: string; cards: string };

type Props = {
  room: Room;
  opened: boolean;
  closeDrawer: () => void;
};

export const RoomSettingsDrawer = ({ room, opened, closeDrawer }: Props) => {
  const { notifySuccess } = useNotification();
  const form = useForm<FormValues>({
    initialValues: { name: "", cards: "" },
    validate: zodResolver(roomFormSchema().pick({ name: true, cards: true })),
  });

  const updateRoomMuation = useUpdateRoom({ id: room.id });
  const handleSubmit = ({ name, cards }: FormValues) => {
    updateRoomMuation.mutate(
      {
        name,
        cards: cards.split(",").map(Number),
      },
      {
        onSuccess: () => {
          notifySuccess({ message: "変更を保存しました。" });
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    closeDrawer();
    form.reset();
  };

  useEffect(() => {
    if (opened) {
      // use this instead of initialValues option to apply latest room data
      form.setValues({ name: room.name, cards: room.cards.join(",") });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title="ルーム設定"
      padding="xl"
      size="xl"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="部屋名"
          mb="lg"
          required
          {...form.getInputProps("name")}
        />
        <TextInput
          label="手札"
          mb="lg"
          required
          {...form.getInputProps("cards")}
        />
        <Flex justify="center" align="center">
          <Button type="submit" loading={updateRoomMuation.isLoading}>
            保存する
          </Button>
        </Flex>
      </form>
    </Drawer>
  );
};
