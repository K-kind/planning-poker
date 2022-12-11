import { z } from "zod";

export const roomFormSchema = () => {
  return z.object({
    name: z
      .string()
      .min(1, { message: "1文字以上を入力してください。" })
      .max(20, { message: "20文字以内で入力してください。" })
      .regex(/\S+/, { message: "無効な名前です。" }),
    cards: z
      .string()
      .min(1, { message: "1文字以上を入力してください。" })
      .max(100, { message: "100文字以内で入力してください。" })
      .regex(/^\d{1,3}(,\d{1,3})*$/, {
        message: "「1,2,3」の形式で入力してください",
      }),
  });
};
