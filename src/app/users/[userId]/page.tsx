"use client";

import { mapLoansToLoansById, useLoanContext } from "@/context/loan.context";
import LoanSchema from "@/types/loan.type";
import appendKeyProp from "@/utils/appendKeyProp";
import fetcher from "@/utils/fetcher";
import { Space, Tag, Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { CalendarOutlined, DollarOutlined, EditOutlined, ShareAltOutlined, UserOutlined } from "@ant-design/icons";

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

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Ошибка: {String(error)}
      </div>
    );
  }

  const columns: ColumnsType<LoanSchema> = [
    {
      title: "ID займа",
      dataIndex: "id",
      key: "loanId",
      render: (loanId) => (
        <span
          onClick={() => handleNavigate(`/loans/${loanId}`)}
          className="font-mono text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700 transition-colors"
        >
          {loanId}
        </span>
      ),
      width: 120,
    },
    {
      title: "Сумма",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="text-slate-700 font-semibold">
          {amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
    {
      title: "Годовая процентная ставка",
      dataIndex: "apr",
      key: "apr",
      render: (apr) => (
        <span className="text-slate-600">{apr}%</span>
      ),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "active" ? "green" : "default"}
          className="px-3 py-1 rounded-full"
        >
          {status === "active" ? "Активный" : "Неактивный"}
        </Tag>
      ),
    },
    {
      title: "ID владельца",
      dataIndex: "owner_id",
      key: "ownerId",
      render: (ownerId) => (
        <span
          onClick={() => handleNavigate(`/users/${ownerId}`)}
          className="font-mono text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors"
        >
          {ownerId}
        </span>
      ),
    },
    {
      title: "Действия",
      key: "action",
      render: (_, record) => (
        <Space size="small" wrap>
          <Button
            type="default"
            size="small"
            icon={<CalendarOutlined />}
            onClick={() => handleNavigate(`/loans/${record.id}`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            График
          </Button>
          <Button
            type="default"
            size="small"
            icon={<DollarOutlined />}
            onClick={() => handleNavigate(`/loans/${record.id}/history`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            История
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleNavigate(`/loans/${record.id}/update`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            Обновить
          </Button>
          <Button
            type="default"
            size="small"
            icon={<ShareAltOutlined />}
            onClick={() => handleNavigate(`/loans/${record.id}/share`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            Предоставить
          </Button>
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
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <UserOutlined className="text-3xl text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Пользователь {userId}
          </h1>
        </div>
        <p className="text-slate-500">Управление займами пользователя</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Мои займы</h2>
            <p className="text-sm text-slate-500 mt-1">
              Займы, созданные этим пользователем
            </p>
          </div>
          <Table
            columns={columns}
            dataSource={appendKeyProp(dataByOwner.own)}
            loading={{ size: "large", spinning: isLoading }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Всего займов: ${total}`,
            }}
            rowClassName="hover:bg-indigo-50/50 transition-colors"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">
              Предоставленные займы
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Займы, предоставленные этому пользователю
            </p>
          </div>
          <Table
            columns={columns}
            dataSource={appendKeyProp(dataByOwner.shared)}
            loading={{ size: "large", spinning: isLoading }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Всего займов: ${total}`,
            }}
            rowClassName="hover:bg-indigo-50/50 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
