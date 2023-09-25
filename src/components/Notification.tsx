import { Button, notification } from "antd";

type NotificationType = {
  children: React.ReactNode;
  message: string;
};

const Notification: React.FC<NotificationType> = ({ children, message }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message,
      duration: 1,
    });
  };

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default Notification;
