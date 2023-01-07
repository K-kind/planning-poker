import { NotificationProps, showNotification } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons";

type OptionsForSuccess = {
  title?: string;
  message: string;
  options?: Omit<NotificationProps, "title" | "message">;
};

type OptionsForError = {
  title?: string;
  message?: string;
  options?: Omit<NotificationProps, "title" | "message">;
};

export const useNotification = () => {
  const notifySuccess = ({
    title,
    message,
    options = {},
  }: OptionsForSuccess) => {
    showNotification({
      title,
      message,
      icon: <IconCheck />,
      color: "teal",
      ...options,
    });
  };

  const notifyError = ({
    title,
    message = "エラーが発生しました。",
    options = {},
  }: OptionsForError = {}) => {
    showNotification({
      title,
      message,
      icon: <IconAlertCircle />,
      color: "red",
      styles: { icon: { height: 24, width: 24 } },
      autoClose: false,
      ...options,
    });
  };

  return {
    notifySuccess,
    notifyError,
  };
};
