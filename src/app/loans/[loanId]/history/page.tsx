"use client";

import LoanRange from "@/components/LoanRange";
import SelectLoanRange from "@/components/SelectLoanRange";
import { Button, Space } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarOutlined, DollarOutlined, EditOutlined, ShareAltOutlined, HistoryOutlined } from "@ant-design/icons";

const LoanHistory = ({ params }: { params: { loanId: string } }) => {
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [toDate, setToDate] = useState<number | null>(null);
  const { loanId } = params;
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <HistoryOutlined className="text-3xl text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            История займа {loanId}
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
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Выберите начальную и конечную дату:
          </h2>
          <div className="flex-1 max-w-md">
            <SelectLoanRange setFromDate={setFromDate} setToDate={setToDate} />
          </div>
        </div>
        <LoanRange loanId={loanId} fromDate={fromDate} toDate={toDate} />
      </div>
    </div>
  );
};

export default LoanHistory;
