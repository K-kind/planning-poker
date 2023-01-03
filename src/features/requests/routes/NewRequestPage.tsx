import { Box, Button, Flex, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { APP_NAME } from "@/shared/constants";
import { requestFormSchema } from "@/features/requests/schemas/requestForm";
import { useCreateRequest } from "@/features/requests/api/createRequest";
import { useNotification } from "@/shared/hooks/useNotification";

type FormValues = { content: string };

export const NewRequestPage = () => {
  const { notifySuccess } = useNotification();

  const form = useForm<FormValues>({
    initialValues: { content: "" },
    validate: zodResolver(requestFormSchema().pick({ content: true })),
  });

  const createRequestMutation = useCreateRequest();

  const handleSubmit = async ({ content }: FormValues) => {
    try {
      await createRequestMutation.mutateAsync({ content });
      notifySuccess({
        message: "送信に成功しました。ご意見ありがとうございます。",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Box component="h1" fz="xl">
        ご意見箱
      </Box>

      <Box component="p" fz="sm">
        {APP_NAME}
        に関するご意見、ご要望などがありましたら、お気軽にお寄せください。（送信内容は開発者にのみ届きます。）
      </Box>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" align="center">
          <Textarea
            mb="lg"
            w="100%"
            autosize
            minRows={4}
            maxRows={16}
            required
            {...form.getInputProps("content")}
          />
          <Button
            type="submit"
            loading={createRequestMutation.isLoading}
            loaderPosition="center"
            w={200}
          >
            送信
          </Button>
        </Flex>
      </form>
    </>
  );
};
