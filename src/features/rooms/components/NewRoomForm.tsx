import { useContext } from "react";
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCreateRoom } from "@/features/rooms/api/createRoom";
import { Room } from "@/features/rooms/types/room";
import { useAnonSignUp } from "@/features/auth/api/anonSignUp";
import { AuthContext } from "@/providers/auth";
import { roomFormSchema } from "@/features/rooms/schemas/roomForm";

type Props = {
  onSubmit: (room: Room) => void;
};

type FormValues = { name: string };

export const NewRoomForm = ({ onSubmit }: Props) => {
  const { user } = useContext(AuthContext);
  const form = useForm<FormValues>({
    initialValues: { name: "" },
    validate: zodResolver(roomFormSchema()),
  });

  const createRoomMutation = useCreateRoom();
  const anonSignUpMutation = useAnonSignUp();

  const handleSubmit = async ({ name }: FormValues) => {
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" align="center">
          <TextInput
            label="部屋名"
            mb="lg"
            required
            {...form.getInputProps("name")}
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
