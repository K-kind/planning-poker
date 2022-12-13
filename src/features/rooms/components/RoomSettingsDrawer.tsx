import { useEffect } from "react";
import {
  Button,
  Divider,
  Drawer,
  Flex,
  List,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLogout } from "@tabler/icons";
import styled from "@emotion/styled";
import { Room } from "@/features/rooms/types/room";
import { roomFormSchema } from "@/features/rooms/schemas/roomForm";
import { useUpdateRoom } from "@/features/rooms/api/updateRoom";
import { useNotification } from "@/shared/hooks/useNotification";
import { useModal } from "@/shared/hooks/useModal";
import { Player } from "@/features/rooms/types/player";
import { useDeletePlayer } from "@/features/rooms/api/deletePlayer";

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
  const { notifySuccess } = useNotification();
  const { confirm } = useModal();
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
      console.error(e);
      return;
    }

    notifySuccess({ message: "変更を保存しました。" });
    doClose();
  };

  const deletePlayerMutation = useDeletePlayer({ room });

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

  return (
    <Drawer
      opened={opened}
      onClose={doClose}
      title="ルーム設定"
      padding="xl"
      size="xl"
      styles={() => ({ drawer: { overflowY: "auto" } })}
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
          <Button
            type="submit"
            loading={updateRoomMuation.isLoading}
            loaderPosition="center"
          >
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

      <List spacing="xs" withPadding>
        {room.players.map((player) => (
          <StyledListItem key={player.id}>
            <Flex justify="space-between" align="center">
              <Text>{player.name}</Text>
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
    </Drawer>
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
