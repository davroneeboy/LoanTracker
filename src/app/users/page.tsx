"use client";

import useSWR from "swr";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";
import Title from "antd/es/typography/Title";

import { Space, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";

const Users = () => {
  const { data, isLoading, error } = useSWR<UserSchema[]>(`api/users`, fetcher);
  const router = useRouter();

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
          <a>💸 View Loans</a>
        </Space>
      ),
    },
  ];

  const dataWithKey = data?.map((d) => {
    return {
      ...d,
      key: `user-${d.id}`,
    };
  });

  return (
    <div>
      <Title>All Users</Title>
      {isLoading ? (
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      ) : (
        <Table
          style={{ width: "80%", margin: "0 auto" }}
          columns={columns}
          dataSource={dataWithKey}
        />
      )}
    </div>
  );
};

export default Users;
