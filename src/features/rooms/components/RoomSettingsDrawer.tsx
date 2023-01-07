import { useEffect } from "react";
import { Button, Divider, Drawer, Flex, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Room } from "@/features/rooms/types/room";
import { roomFormSchema } from "@/features/rooms/schemas/roomForm";
import { useUpdateRoom } from "@/features/rooms/api/updateRoom";
import { useNotification } from "@/shared/hooks/useNotification";
import { Player } from "@/features/rooms/types/player";
import { PlayerList } from "@/features/rooms/components/PlayerList";
import { captureException } from "@/lib/sentry";

type FormValues = { name: string; cards: string };

type Props = {
  room: Room;
  opened: boolean;
  player: Player;
  closeDrawer: () => void;
};

export const RoomSettingsDrawer = ({
  room,
  opened,
  player: me,
  closeDrawer,
}: Props) => {
  const { notifySuccess, notifyError } = useNotification();
  const form = useForm<FormValues>({
    initialValues: { name: "", cards: "" },
    validate: zodResolver(roomFormSchema().pick({ name: true, cards: true })),
  });

  const doClose = () => {
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

  const updateRoomMuation = useUpdateRoom({ id: room.id });
  const handleSubmit = async ({ name, cards }: FormValues) => {
    try {
      await updateRoomMuation.mutateAsync({
        name,
        cards: cards.split(",").map(Number),
      });
    } catch (e) {
      captureException(e);
      notifyError();
      return;
    }

    notifySuccess({ message: "変更を保存しました。" });
    doClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={doClose}
      title="ルーム設定"
      padding="xl"
      size="xl"
      styles={() => ({
        drawer: { overflowY: "auto" },
        title: { fontWeight: "bold" },
      })}
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

      <Divider
        w="100%"
        mt={56}
        mb="md"
        label="プレイヤー管理"
        labelPosition="center"
        labelProps={{ size: "md" }}
      />

      <PlayerList room={room} me={me} />
    </Drawer>
  );
};
