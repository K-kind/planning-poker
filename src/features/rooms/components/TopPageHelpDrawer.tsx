import { Box, Drawer, List } from "@mantine/core";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";

type Props = {
  opened: boolean;
  closeDrawer: () => void;
};

export const TopPageHelpDrawer = ({ opened, closeDrawer }: Props) => {
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

        <ItemWithTitle title="部屋の作成・入室方法">
          <List type="ordered">
            <List.Item>代表者が、部屋名を入力して部屋を作成します。</List.Item>
            <List.Item>
              代表者が、作成した部屋のURLを参加者に共有します。
            </List.Item>
            <List.Item>参加者は、共有されたURLから部屋に入ります。</List.Item>
          </List>
        </ItemWithTitle>
      </Box>
    </Drawer>
  );
};
