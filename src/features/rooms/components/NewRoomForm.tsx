import { FormEvent, useContext, useState } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useCreateRoom } from "@/features/rooms/api/createRoom";
import { Room } from "@/features/rooms/types/room";
import { useAnonSignUp } from "@/features/auth/api/anonSignUp";
import { AuthContext } from "@/providers/auth";

type Props = {
  onSubmit: (room: Room) => void;
};

export const NewRoomForm = ({ onSubmit }: Props) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");

  const createRoomMutation = useCreateRoom();
  const anonSignUpMutation = useAnonSignUp();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name === "") {
      return showNotification({
        title: "エラー",
        message: "部屋名を入力してください。",
        color: "red",
      });
    }

    try {
      user == null && (await anonSignUpMutation.mutateAsync());
      const room = await createRoomMutation.mutateAsync({ name });
      onSubmit(room);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Flex justify="center" pt={{ base: "xl", md: 32 }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" align="center">
          <TextInput
            label="部屋名"
            value={name}
            mb="lg"
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type="submit"
            loading={
              createRoomMutation.isLoading || anonSignUpMutation.isLoading
            }
          >
            部屋を作成する
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
