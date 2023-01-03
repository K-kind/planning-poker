import { Box, Drawer } from "@mantine/core";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";

type Props = {
  opened: boolean;
  closeDrawer: () => void;
};

export const NewPlayerHelpDrawer = ({ opened, closeDrawer }: Props) => {
  return (
    <Drawer
      opened={opened}
      onClose={closeDrawer}
      title="ヘルプ"
      padding="xl"
      size={700}
      position="right"
      styles={() => ({
        drawer: { overflowY: "auto" },
        title: { fontWeight: "bold" },
      })}
    >
      <Box pt="lg">
        <ItemWithTitle title="Simple Planning Pokerとは">
          <p>
            アジャイル開発における見積もり手法の1つである「プランニングポーカー」を、オンラインで行うためのアプリです。どなたでも無料でお使いいただけます。
          </p>
        </ItemWithTitle>

        <ItemWithTitle title="入室方法">
          <p>入室する前に、プレイヤー名を入力いただく必要があります。</p>
          <p>プレイヤー名は、この部屋の参加者にのみ開示されます。</p>
        </ItemWithTitle>
      </Box>
    </Drawer>
  );
};
