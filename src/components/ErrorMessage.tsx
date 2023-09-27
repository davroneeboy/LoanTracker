import { Alert } from "antd";

const ErrorMessage = ({ message }: { message: string }) => (
  <Alert message="Error" description={`${message}`} type="error" showIcon />
);

export default ErrorMessage;
