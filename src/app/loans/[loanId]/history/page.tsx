"use client";

import LoanRange from "@/components/LoanRange";
import SelectLoanRange from "@/components/SelectLoanRange";
import { Divider, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoanHistory = ({ params }: { params: { loanId: string } }) => {
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [toDate, setToDate] = useState<number | null>(null);
  const { loanId } = params;
  const router = useRouter();

  return (
    <>
      <Title>{`История займа ${loanId}`}</Title>
      <Space size="middle">
        <a onClick={() => router.push(`/loans/${loanId}`)}>🗓️ График</a>
        <a onClick={() => router.push(`/loans/${loanId}/history`)}>
          💰 История платежей
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/update`)}>
          ✏️ Обновить займ
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/share`)}>
          ↪️ Предоставить займ
        </a>
      </Space>
      <Divider />
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title level={4}>Выберите начальную и конечную дату:</Title>
        <div style={{ marginLeft: "2%" }}>
          <SelectLoanRange setFromDate={setFromDate} setToDate={setToDate} />
        </div>
      </div>
      <LoanRange loanId={loanId} fromDate={fromDate} toDate={toDate} />
    </>
  );
};

export default LoanHistory;
