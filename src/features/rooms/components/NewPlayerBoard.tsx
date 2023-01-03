import { useContext, useState } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Room } from "@/features/rooms/types/room";
import { useCreatePlayer } from "@/features/rooms/api/createPlayer";
import { AuthContext } from "@/providers/auth";
import { playerFormSchema } from "@/features/rooms/schemas/playerForm";
import { NewPlayerHeader } from "@/features/rooms/components/NewPlayerHeader";
import { NewPlayerHelpDrawer } from "@/features/rooms/components/NewPlayerHelpDrawer";

type Props = {
  room: Room;
};

type FormValues = { name: string };

export const NewPlayerBoard = ({ room }: Props) => {
  const { user } = useContext(AuthContext);
  const form = useForm<FormValues>({
    initialValues: { name: "" },
    validate: zodResolver(playerFormSchema().pick({ name: true })),
  });
  const [helpOpened, setHelpOpened] = useState(false);

  const createPlayerMutation = useCreatePlayer({ room });

  const handleSubmit = ({ name }: FormValues) => {
    createPlayerMutation.mutate({ id: user!.id, name });
  };

  return (
    <Flex direction="column" align="center" pt={{ base: "xl", md: 32 }}>
      <NewPlayerHeader
        room={room}
        openHelp={() => setHelpOpened(true)}
        sx={{ marginBottom: 60, width: "100%" }}
      />

      <NewPlayerHelpDrawer
        opened={helpOpened}
        closeDrawer={() => setHelpOpened(false)}
      />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" align="center">
          <TextInput
            label="プレイヤー名"
            mb="lg"
            required
            {...form.getInputProps("name")}
          />
          <Button
            type="submit"
            loading={createPlayerMutation.isLoading}
            loaderPosition="center"
            w="100%"
          >
            {room.name} に入室
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
