import { useState } from "react";
import { Button, Flex, Popover, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Player } from "@/features/rooms/types/player";
import { Room } from "@/features/rooms/types/room";
import { useUpdatePlayer } from "@/features/rooms/api/updatePlayer";
import { playerFormSchema } from "@/features/rooms/schemas/playerForm";
import { useNotification } from "@/shared/hooks/useNotification";
import { captureException } from "@/lib/sentry";

type Props = {
  room: Room;
  player: Player;
  isMe: boolean;
};

export const PlayerName = ({ room, player, isMe }: Props) => {
  if (isMe) {
    return <WithPopover room={room} player={player} />;
  } else {
    return <NameText player={player} isMe={false} />;
  }
};

const NameText = ({ player, isMe }: { player: Player; isMe: boolean }) => {
  return (
    <Text size="sm" mt={4} c={isMe ? "blue" : undefined}>
      {player.name}
    </Text>
  );
};

type FormValues = { name: string };

const WithPopover = ({ room, player }: { room: Room; player: Player }) => {
  const { notifySuccess, notifyError } = useNotification();
  const form = useForm<FormValues>({
    initialValues: { name: player.name },
    validate: zodResolver(playerFormSchema().pick({ name: true })),
  });

  const [opened, setOpened] = useState(false);

  const toggle = (open: boolean) => {
    if (!open) {
      form.clearErrors();
    } else {
      form.setValues({ name: player.name });
    }
    setOpened(open);
  };

  const updatePlayerMutation = useUpdatePlayer({ id: player.id, room });
  const handleSubmit = async ({ name }: FormValues) => {
    try {
      await updatePlayerMutation.mutate({ name });
    } catch (e) {
      captureException(e);
      notifyError();
      return;
    }

    notifySuccess({ message: "変更を保存しました。" });
    toggle(false);
  };

  return (
    <Popover opened={opened} onChange={toggle} trapFocus withArrow shadow="md">
      <Popover.Target>
        <span onClick={() => toggle(true)} style={{ cursor: "pointer" }}>
          <NameText player={player} isMe={true} />
        </span>
      </Popover.Target>

      <Popover.Dropdown
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        })}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Flex align="center">
            <TextInput size="xs" w="400" {...form.getInputProps("name")} />
            <Button
              type="submit"
              size="xs"
              ml="xs"
              loading={updatePlayerMutation.isLoading}
              loaderPosition="center"
            >
              保存
            </Button>
          </Flex>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
};
