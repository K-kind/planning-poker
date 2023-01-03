import { z } from "zod";

export const requestFormSchema = () => {
  return z.object({
    content: z
      .string()
      .min(1, { message: "1文字以上を入力してください。" })
      .max(4000, { message: "4000文字以内で入力してください。" })
      .regex(/\S+/, { message: "無効な文字列です。" }),
  });
};
