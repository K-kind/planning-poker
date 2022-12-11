import { z } from "zod";

export const playerFormSchema = () => {
  return z.object({
    name: z
      .string()
      .min(1, { message: "1文字以上を入力してください。" })
      .max(20, { message: "20文字以内で入力してください。" })
      .regex(/\S+/, { message: "無効な名前です。" }),
  });
};
