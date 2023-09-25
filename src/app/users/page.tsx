"use client";

import useSWR from "swr";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";
import Title from "antd/es/typography/Title";

import { Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import appendKeyProp from "@/utils/appendKeyProp";

const Users = () => {
  const router = useRouter();
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<UserSchema[]>(`api/users`, fetcher);

  if (error) return <p>{`Error: ${error}`}</p>;

  const columns: ColumnsType<UserSchema> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "userId",
      render: (userId) => (
        <a onClick={() => router.push(`users/${userId}`)}>{userId}</a>
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
          <a onClick={() => router.push(`users/${record.id}`)}>💸 View Loans</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title>All Users</Title>
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          style={{ width: "80%", margin: "0 auto" }}
          columns={columns}
          dataSource={appendKeyProp(data)}
        />
      )}
    </div>
  );
};

export default Users;
