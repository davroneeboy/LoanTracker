"use client";

import LoanRange from "@/components/LoanRange";
import SelectLoanRange from "@/components/SelectLoanRange";
import Title from "antd/es/typography/Title";
import { useState } from "react";

const LoanHistory = ({ params }: { params: { loanId: string } }) => {
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [toDate, setToDate] = useState<number | null>(null);
  const { loanId } = params;

  return (
    <>
      <Title>{`Loan ${loanId} History`}</Title>
      <SelectLoanRange setFromDate={setFromDate} setToDate={setToDate} />
      <LoanRange loanId={loanId} fromDate={fromDate} toDate={toDate} />
    </>
  );
};

export default LoanHistory;
