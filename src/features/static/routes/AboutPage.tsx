import { ItemWithTitle } from "@/shared/components/ItemWithTitle";
import { APP_NAME } from "@/shared/constants";
import { Box, Image } from "@mantine/core";

export const AboutPage = () => {
  return (
    <>
      <Box component="h1" fz="xl">
        {APP_NAME}について
      </Box>

      <ItemWithTitle>
        <p>
          このアプリは、アジャイル開発における見積もり手法の1つである「プランニングポーカー」を、オンラインで行うためのアプリです。
          <br />
          開発者の学習も兼ねて作成されたアプリのため、どなたでもログインなしで無料でお使いいただけます。
        </p>
      </ItemWithTitle>

      <ItemWithTitle title="デモ">
        <Image
          src="/images/demo.gif"
          alt="demo.gif"
          withPlaceholder
          maw={600}
          radius="lg"
          styles={(theme) => ({
            image: {
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: theme.colors.dark[0],
            },
          })}
        />
      </ItemWithTitle>

      <ItemWithTitle>
        <p>詳しい使い方は、各画面のヘルプをご覧ください。</p>
      </ItemWithTitle>
    </>
  );
};
