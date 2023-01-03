import { Box, Drawer, List } from "@mantine/core";
import { ItemWithTitle } from "@/shared/components/ItemWithTitle";

type Props = {
  opened: boolean;
  closeDrawer: () => void;
};

export const RoomHelpDrawer = ({ opened, closeDrawer }: Props) => {
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
        <ItemWithTitle title="はじめに">
          <p>このページのURLを共有し、プレイヤーを招待してください。</p>
        </ItemWithTitle>

        <ItemWithTitle title="プランニングポーカーの流れ">
          <List type="ordered">
            <List.Item>
              各プレイヤーが見積もりの数値を手札から選択します。（選択は他プレイヤーには見えません。）
            </List.Item>
            <List.Item>
              全員が選択したら、代表者が「すべて開く」で全員のカードを開きます。
            </List.Item>
            <List.Item>
              カードを元に見積もりを議論し、終了したら代表者が「リセット」で全員の選択をリセットします。
            </List.Item>
          </List>
        </ItemWithTitle>

        <Box component="h2" fz="md" mt={40} mb="lg">
          Q&A
        </Box>

        <ItemWithTitle title="プレイヤー名を変えるには">
          <p>
            自身の名前をクリックして編集フォームを開き、変更することができます。
          </p>
        </ItemWithTitle>

        <ItemWithTitle title="カードの数字の種類や部屋名を変えるには">
          <p>
            画面右上の設定アイコンから「ルーム設定」を開き、変更することができます。
          </p>
        </ItemWithTitle>

        <ItemWithTitle title="プレイヤーを退室させるには">
          <p>
            画面右上の設定アイコンから「ルーム設定」を開き、該当プレイヤーを退室させることができます。
            <br />
            （退室したプレイヤーは、URLを開くことで、再度名前を入力し入室することができます。）
          </p>
        </ItemWithTitle>

        <ItemWithTitle title="プレイヤーが表示されなくなった">
          <p>
            長時間無操作状態が続いたプレイヤーは表示されなくなります。
            <br />
            そのプレイヤーが再度画面を開くことで、再び表示されるようになります。
          </p>
        </ItemWithTitle>
      </Box>
    </Drawer>
  );
};
