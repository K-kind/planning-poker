import { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Flex, Loader, Text, Tooltip } from "@mantine/core";
import { IconHelp } from "@tabler/icons";
import { NewRoomForm } from "@/features/rooms/components/NewRoomForm";
import { Room } from "@/features/rooms/types/room";
import { RoomHistories } from "@/features/rooms/components/RoomHistories";
import { TopPageHelpDrawer } from "@/features/rooms/components/TopPageHelpDrawer";

export const TopPage = () => {
  const navigate = useNavigate();
  const [helpOpened, setHelpOpened] = useState(false);

  const onCreateRoom = async (room: Room) => {
    navigate(`/rooms/${room.id}`);
  };

  return (
    <Flex justify="center">
      <Flex direction="column" align="center" pt="xl" w="100%">
        <Flex justify="flex-end" align="center" w="100%" mb="lg">
          <Tooltip label="ヘルプ" withArrow>
            <Button
              variant="subtle"
              size="xs"
              color="gray"
              onClick={() => setHelpOpened(true)}
            >
              <IconHelp />
            </Button>
          </Tooltip>
        </Flex>

        <TopPageHelpDrawer
          opened={helpOpened}
          closeDrawer={() => setHelpOpened(false)}
        />

        <Text>代表者が部屋を作成して、URLを共有しましょう。</Text>

        <NewRoomForm onSubmit={onCreateRoom} />

        <Divider
          w="100%"
          mt={{ base: 56, sm: 64 }}
          mb={{ base: "md", sm: "lg" }}
          label="過去に参加した部屋"
          labelPosition="center"
          labelProps={{ size: "sm" }}
        />
        <Suspense fallback={<Loader />}>
          <RoomHistories />
        </Suspense>
      </Flex>
    </Flex>
  );
};
