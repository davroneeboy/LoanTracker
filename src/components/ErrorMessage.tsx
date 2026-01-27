import { Alert } from "antd";

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
    <Alert
      message="Ошибка"
      description={message}
      type="error"
      showIcon
      className="rounded-lg"
    />
  </div>
);

export default ErrorMessage;
