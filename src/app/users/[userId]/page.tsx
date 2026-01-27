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

  if (error) return <p>{`Ошибка: ${error}`}</p>;

  const columns: ColumnsType<LoanSchema> = [
    {
      title: "ID займа",
      dataIndex: "id",
      key: "loanId",
      render: (loanId) => (
        <a onClick={() => router.push(`/loans/${loanId}`)}>{loanId}</a>
      ),
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
      render: (amount) =>
        amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Годовая процентная ставка",
      dataIndex: "apr",
      key: "apr",
      render: (apr) => `${apr}%`,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "success" : "default"}>
          {status === "active" ? "Активный" : "Неактивный"}
        </Tag>
      ),
    },
    {
      title: "ID владельца",
      dataIndex: "owner_id",
      key: "ownerId",
      render: (userId) => (
        <a onClick={() => router.push(`/users/${userId}`)}>{userId}</a>
      ),
    },
    {
      title: "Действие",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => router.push(`/loans/${record.id}`)}>🗓️ График</a>
          <a onClick={() => router.push(`/loans/${record.id}/history`)}>
            💰 История платежей
          </a>
          <a onClick={() => router.push(`/loans/${record.id}/update`)}>
            ✏️ Обновить займ
          </a>
          <a onClick={() => router.push(`/loans/${record.id}/share`)}>
            ↪️ Предоставить займ
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
      <Title>{`Пользователь ${userId}`}</Title>

      <Title level={2}>Мои займы</Title>
      <Table
        style={{ width: "80%", margin: "0 auto" }}
        columns={columns}
        dataSource={appendKeyProp(dataByOwner.own)}
        loading={{ size: "large", spinning: isLoading }}
      />

      <Title level={2}>Предоставленные займы</Title>
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
