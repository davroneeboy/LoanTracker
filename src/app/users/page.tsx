"use client";

import useSWR from "swr";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";
import Title from "antd/es/typography/Title";

import { Space, Table, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import appendKeyProp from "@/utils/appendKeyProp";
import { useUserContext } from "@/context/user.context";

const Users = () => {
  const router = useRouter();
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<UserSchema[]>(`api/users`, fetcher);
  const { user, setUser } = useUserContext();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 1,
    });
  };

  if (error) return <p>{`Error: ${error}`}</p>;

  const columns: ColumnsType<UserSchema> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "userId",
      render: (userId) => (
        <a onClick={() => router.push(`/users/${userId}`)}>{userId}</a>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {contextHolder}
          <a onClick={() => router.push(`/users/${record.id}`)}>
            💸 View Loans
          </a>
          <a
            onClick={() => {
              setUser(record.id);
              openNotification(`User ${record.id} Logged In!`);
            }}
          >
            🔑 Switch User
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title>All Users</Title>
      <Table
        style={{ width: "80%", margin: "0 auto" }}
        columns={columns}
        dataSource={appendKeyProp(data)}
        loading={{ size: "large", spinning: isLoading }}
      />
    </div>
  );
};

export default Users;
