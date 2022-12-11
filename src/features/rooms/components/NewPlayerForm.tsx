import { FormEvent, useContext, useState } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Room } from "@/features/rooms/types/room";
import { useCreatePlayer } from "@/features/rooms/api/createPlayer";
import { AuthContext } from "@/providers/auth";

type Props = {
  room: Room;
};

export const NewPlayerForm = ({ room }: Props) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");

  const createPlayerMutation = useCreatePlayer({ room });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name?.trim() === "") {
      return showNotification({
        title: "エラー",
        message: "プレイヤー名を入力してください。",
        color: "red",
      });
    }

    createPlayerMutation.mutateAsync({ id: user!.id, name });
  };

  return (
    <Flex direction="column" align="center" pt={{ base: "xl", md: 32 }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" align="center">
          <TextInput
            label="プレイヤー名"
            value={name}
            mb="lg"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" loading={createPlayerMutation.isLoading}>
            {room.name} に入室
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
