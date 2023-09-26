"use client";

import { mapLoansToLoansById, useLoanContext } from "@/context/loan.context";
import LoanSchema from "@/types/loan.type";
import appendKeyProp from "@/utils/appendKeyProp";
import fetcher from "@/utils/fetcher";
import { Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const UserPage = ({ params }: { params: { userId: string } }) => {
  const { loans, setLoans } = useLoanContext();
  const router = useRouter();
  const { userId } = params;
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<LoanSchema[]>(`/api/users/${userId}/loans`, fetcher);

  useEffect(() => {
    setLoans(mapLoansToLoansById(data));
  }, [data, setLoans]);

  if (error) return <p>{`Error: ${error}`}</p>;

  const columns: ColumnsType<LoanSchema> = [
    {
      title: "Loan ID",
      dataIndex: "id",
      key: "loanId",
      render: (loanId) => (
        <a onClick={() => router.push(`/loans/${loanId}`)}>{loanId}</a>
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
          <a onClick={() => router.push(`/loans/${record.id}`)}>🗓️ Schedule</a>
          <a onClick={() => router.push(`/loans/${record.id}/history`)}>
            💰 Payment History
          </a>
          <a onClick={() => router.push(`/loans/${record.id}/update`)}>
            ✏️ Update Loan
          </a>
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

  return (
    <div>
      <Title>{`User ${userId}`}</Title>

      <Title level={2}>My Loans</Title>
      <Table
        style={{ width: "80%", margin: "0 auto" }}
        columns={columns}
        dataSource={appendKeyProp(dataByOwner.own)}
        loading={{ size: "large", spinning: isLoading }}
      />

      <Title level={2}>Shared Loans</Title>
      <Table
        style={{ width: "80%", margin: "0 auto" }}
        columns={columns}
        dataSource={appendKeyProp(dataByOwner.shared)}
        loading={{ size: "large", spinning: isLoading }}
      />
    </div>
  );
};

export default UserPage;
