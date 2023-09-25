"use client";

import useSWR from "swr";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";
import Title from "antd/es/typography/Title";

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const Users = () => {
  const { data, isLoading, error } = useSWR<UserSchema[]>(`api/users`, fetcher);
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
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
          <a>Edit</a>
          <a>Share</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title>All Users</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Users;
