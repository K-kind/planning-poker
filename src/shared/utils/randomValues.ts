import { uuid } from "@/shared/utils/uuid";

export const generateRandomEmail = () => {
  return `${uuid()}@example.com`;
};

export const generateRandomPassword = () => {
  return `${uuid()}${uuid()}`;
};
