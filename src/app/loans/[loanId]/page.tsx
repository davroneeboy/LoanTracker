"use client";

import ErrorMessage from "@/components/ErrorMessage";
import LoanTable from "@/components/LoanTable";
import { useUserContext } from "@/context/user.context";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import { ApiValidationError } from "@/types/validationError.type";
import fetcher from "@/utils/fetcher";
import { Button, Space } from "antd";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { CalendarOutlined, DollarOutlined, EditOutlined, ShareAltOutlined, BankOutlined } from "@ant-design/icons";

const LoanPage = ({ params }: { params: { loanId: string } }) => {
  const { user } = useUserContext();
  const { loanId } = params;
  const router = useRouter();

  const { data, isLoading, error } = useSWR<
    LoanScheduleSchema[] & ApiValidationError
  >(`/api/loans/${loanId}?user_id=${user}`, fetcher);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (data?.error) {
    return <ErrorMessage message={`${data.error.detail}`} />;
  }

  if (error) {
    return <ErrorMessage message={`${JSON.stringify(error)}`} />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BankOutlined className="text-3xl text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Займ {loanId}
            </h1>
          </div>
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <LoanTable data={data || []} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default LoanPage;
