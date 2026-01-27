"use client";

import ErrorMessage from "@/components/ErrorMessage";
import SelectDropdown from "@/components/SelectDropdown";
import UserSchema from "@/types/user.type";
import { ApiValidationError } from "@/types/validationError.type";
import fetcher from "@/utils/fetcher";
import { UserOutlined } from "@ant-design/icons";
import { Space, Spin, Button } from "antd";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { CalendarOutlined, DollarOutlined, EditOutlined, ShareAltOutlined } from "@ant-design/icons";

const LoanShare = ({ params }: { params: { loanId: string } }) => {
  const { loanId } = params;
  const router = useRouter();

  const { data, isLoading, error } = useSWR<UserSchema[] & ApiValidationError>(
    `/api/users`,
    fetcher
  );

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (data?.error) {
    return <ErrorMessage message={`${data.error.detail}`} />;
  }

  if (error) return <ErrorMessage message={`${JSON.stringify(error)}`} />;

  const options = data?.map((d) => menuItem(d)) || [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <ShareAltOutlined className="text-3xl text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Предоставить займ {loanId}
          </h1>
        </div>
        <Space size="middle" wrap>
          <Button
            type="default"
            icon={<CalendarOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            График
          </Button>
          <Button
            type="default"
            icon={<DollarOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}/history`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            История платежей
          </Button>
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}/update`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            Обновить займ
          </Button>
          <Button
            type="default"
            icon={<ShareAltOutlined />}
            onClick={() => handleNavigate(`/loans/${loanId}/share`)}
            className="hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600"
          >
            Предоставить займ
          </Button>
        </Space>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            Выберите пользователя
          </h2>
          <p className="text-slate-500">
            Выберите пользователя, которому вы хотите предоставить доступ к этому займу
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : (
          <SelectDropdown loanId={loanId} options={options} />
        )}
      </div>
    </div>
  );
};

const menuItem = (user: UserSchema) => ({
  label: `${user.id}: ${user.username}`,
  value: `${user.id}`,
  key: `user-${user.id}`,
  icon: <UserOutlined />,
});

export default LoanShare;
