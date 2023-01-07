import { Box, Button, Flex, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { APP_NAME } from "@/shared/constants";
import { requestFormSchema } from "@/features/requests/schemas/requestForm";
import { useCreateRequest } from "@/features/requests/api/createRequest";
import { useNotification } from "@/shared/hooks/useNotification";
import { captureException } from "@/lib/sentry";

type FormValues = { content: string };

export const NewRequestPage = () => {
  const { notifySuccess, notifyError } = useNotification();

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
      captureException(e);
      notifyError();
    }
  };

  return (
    <>
      <Box component="h1" fz="xl">
        ご意見箱
      </Box>

      <Box component="p" fz="sm">
        {APP_NAME}
        に関するご意見、ご要望などがありましたら、お気軽にお寄せください。
      </Box>
      <Box component="p" fz="sm">
        また、不具合等についてもこちらでご報告いただけますと幸いです。
      </Box>
      <Box component="p" fz="sm">
        （送信内容は開発者にのみ届きます。）
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
            w={200}
          >
            送信
          </Button>
        </Flex>
      </form>
    </>
  );
};
