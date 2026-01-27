"use client";

import useSWR from "swr";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";
import { Space, Table, notification, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import appendKeyProp from "@/utils/appendKeyProp";
import { useUserContext } from "@/context/user.context";
import { EyeOutlined, UserSwitchOutlined } from "@ant-design/icons";

const Users = () => {
  const router = useRouter();
  const {
    data = [],
    isLoading,
    error,
  } = useSWR<UserSchema[]>(`/api/users`, fetcher);
  const { user, setUser } = useUserContext();
  const [api, contextHolder] = notification.useNotification();

  const handleViewLoans = (userId: number) => {
    router.push(`/users/${userId}`);
  };

  const handleSwitchUser = (userId: number) => {
    setUser(userId);
    openNotification(`Пользователь ${userId} вошел в систему!`);
  };

  const openNotification = (message: string) => {
    api.open({
      message,
      duration: 2,
      placement: "topRight",
    });
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        Ошибка: {String(error)}
      </div>
    );
  }

  // Убеждаемся, что data - это массив
  const usersData = Array.isArray(data) ? data : [];

  const columns: ColumnsType<UserSchema> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "userId",
      render: (userId) => (
        <span className="font-mono text-indigo-600 font-semibold">{userId}</span>
      ),
      width: 100,
    },
    {
      title: "Имя пользователя",
      dataIndex: "username",
      key: "username",
      render: (username) => (
        <span className="text-slate-700 font-medium">{username}</span>
      ),
    },
    {
      title: "Действия",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {contextHolder}
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => handleViewLoans(record.id)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            Просмотр займов
          </Button>
          <Button
            type="primary"
            icon={<UserSwitchOutlined />}
            onClick={() => handleSwitchUser(record.id)}
            className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700"
          >
            Сменить пользователя
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Все пользователи
        </h1>
        <p className="text-slate-500">Управление пользователями системы</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table
          columns={columns}
          dataSource={appendKeyProp(usersData)}
          loading={{ size: "large", spinning: isLoading }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Всего пользователей: ${total}`,
          }}
          rowClassName="hover:bg-indigo-50/50 transition-colors"
        />
      </div>
    </div>
  );
};

export default Users;
