import { Alert } from "antd";

const ErrorMessage = ({ message }: { message: string }) => (
  <Alert message="Ошибка" description={`${message}`} type="error" showIcon />
);

export default ErrorMessage;
