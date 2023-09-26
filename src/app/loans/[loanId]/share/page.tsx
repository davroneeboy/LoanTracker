"use client";

import SelectDropdown from "@/components/SelectDropdown";
import { useUserContext } from "@/context/user.context";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space, notification } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const LoanShare = ({ params }: { params: { loanId: string } }) => {
  const { loanId } = params;
  const router = useRouter();

  const {
    data = [],
    isLoading,
    error,
  } = useSWR<UserSchema[]>(`/api/users`, fetcher);
  const { user, setUser } = useUserContext();

  if (error) return <p>{`Error: ${error}`}</p>;

  const options = data.map((d) => menuItem(d));

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
      <SelectDropdown options={options} />
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
