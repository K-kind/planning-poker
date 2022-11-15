import { FormEvent, useState } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Room } from "@/features/rooms/types/room";
import { useCreatePlayer } from "@/features/rooms/api/createPlayer";

type Props = {
  room: Room;
  onSubmit: (playerId: string) => void;
};

export const NewPlayer = ({ room, onSubmit }: Props) => {
  const [name, setName] = useState("");

  const createPlayerMutation = useCreatePlayer({ room });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") {
      return showNotification({
        title: "エラー",
        message: "名前を入力してください。",
        color: "red",
      });
    }

    try {
      const player = await createPlayerMutation.mutateAsync({ name });
      onSubmit(player.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex direction="column" align="center" pt={{ base: "xl", md: 32 }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" align="center">
          <TextInput
            label="名前を入力してください"
            value={name}
            mb="lg"
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">送信</Button>
        </Flex>
      </form>
    </Flex>
  );
};
