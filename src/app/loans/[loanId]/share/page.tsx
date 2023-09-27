"use client";

import ErrorMessage from "@/components/ErrorMessage";
import SelectDropdown from "@/components/SelectDropdown";
import UserSchema from "@/types/user.type";
import { ApiValidationError } from "@/types/validationError.type";
import fetcher from "@/utils/fetcher";
import { UserOutlined } from "@ant-design/icons";
import { Divider, Space, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const LoanShare = ({ params }: { params: { loanId: string } }) => {
  const { loanId } = params;
  const router = useRouter();

  const { data, isLoading, error } = useSWR<UserSchema[] & ApiValidationError>(
    `/api/users`,
    fetcher
  );

  if (data?.error) {
    return <ErrorMessage message={`${data.error.detail}`} />;
  }

  if (error) return <ErrorMessage message={`${JSON.stringify(error)}`} />;

  const options = data?.map((d) => menuItem(d)) || [];

  return (
    <>
      <Title>{`Loan ${loanId} Share`}</Title>
      <Space size="middle">
        <a onClick={() => router.push(`/loans/${loanId}`)}>🗓️ Schedule</a>
        <a onClick={() => router.push(`/loans/${loanId}/history`)}>
          💰 Payment History
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/update`)}>
          ✏️ Update Loan
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/share`)}>
          ↪️ Share Loan
        </a>
      </Space>
      <Divider />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <SelectDropdown loanId={loanId} options={options} />
      )}
    </>
  );
};

const menuItem = (user: UserSchema) => ({
  label: `${user.id}: ${user.username}`,
  value: `${user.id}`,
  key: `user-${user.id}`,
  icon: <UserOutlined />,
});

export default LoanShare;
