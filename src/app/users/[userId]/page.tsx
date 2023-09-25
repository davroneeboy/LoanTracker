"use client";

import LoanSchema from "@/types/loan.type";
import appendKeyProp from "@/utils/appendKeyProp";
import fetcher from "@/utils/fetcher";
import { Space, Spin, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const UserPage = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();
  const { userId } = params;
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<LoanSchema[]>(`/api/users/${userId}/loans`, fetcher);

  if (error) return <p>{`Error: ${error}`}</p>;

  const columns: ColumnsType<LoanSchema> = [
    {
      title: "Loan ID",
      dataIndex: "id",
      key: "loanId",
      render: (userId) => (
        <a onClick={() => router.push(`/users/${userId}`)}>{userId}</a>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) =>
        amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "APR",
      dataIndex: "apr",
      key: "apr",
      render: (apr) => `${apr}%`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "Owner ID",
      dataIndex: "owner_id",
      key: "ownerId",
      render: (userId) => (
        <a onClick={() => router.push(`/users/${userId}`)}>{userId}</a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>💸 View Loan</a>
          <a>✏️ Update Loan</a>
        </Space>
      ),
    },
  ];

  const dataByOwner = data.reduce(
    (acc, item) => {
      const ownerId = item.owner_id;
      if (parseInt(userId) == ownerId) {
        acc.own.push(item);
      } else {
        acc.shared.push(item);
      }
      return acc;
    },
    { own: [] as LoanSchema[], shared: [] as LoanSchema[] }
  );

  const OwnTable = isLoading ? (
    <Spin size="large" />
  ) : (
    <Table
      style={{ width: "80%", margin: "0 auto" }}
      columns={columns}
      dataSource={appendKeyProp(dataByOwner.own)}
    />
  );

  const SharedTable = isLoading ? (
    <Spin size="large" />
  ) : (
    <Table
      style={{ width: "80%", margin: "0 auto" }}
      columns={columns}
      dataSource={appendKeyProp(dataByOwner.shared)}
    />
  );

  return (
    <div>
      <Title>{`User ${userId}`}</Title>

      <Title level={2}>Own Loans</Title>
      {OwnTable}

      <Title level={2}>Shared Loans</Title>
      {SharedTable}
    </div>
  );
};

export default UserPage;
