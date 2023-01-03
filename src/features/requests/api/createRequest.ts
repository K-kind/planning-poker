import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { CreateRequest, FUNCTION_NAME } from "@/shared/types/functions";

export type CreateRequestDTO = {
  params: { content: string };
};

export const createRequest = async ({ params }: CreateRequestDTO) => {
  const body: CreateRequest["requestBody"] = { content: params.content };
  const { error } = await supabase.functions.invoke<
    CreateRequest["responseData"]
  >(FUNCTION_NAME.createRequest, { body });
  if (error) throw error;
};

export const useCreateRequest = () => {
  return useMutation({
    mutationFn: (params: CreateRequestDTO["params"]) =>
      createRequest({ params }),
  });
};
