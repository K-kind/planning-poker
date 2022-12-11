import { NotificationProps, showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

type Options = {
  title?: string;
  message: string;
  options?: Omit<NotificationProps, "title" | "message">;
};

export const useNotification = () => {
  const notifySuccess = ({ title, message, options = {} }: Options) => {
    showNotification({
      title,
      message,
      icon: <IconCheck />,
      color: "teal",
      ...options,
    });
  };

  return {
    notifySuccess,
  };
};
