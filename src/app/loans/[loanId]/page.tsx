"use client";

import LoanTable from "@/components/LoanTable";
import SelectLoanRange from "@/components/SelectLoanRange";
import { useUserContext } from "@/context/user.context";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import fetcher from "@/utils/fetcher";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import useSWR from "swr";

const LoanPage = ({ params }: { params: { loanId: string } }) => {
  const [fromDate, setFromDate] = useState<number | null>(null);
  const [toDate, setToDate] = useState<number | null>(null);

  const { user, setUser } = useUserContext();
  const { loanId } = params;

  const { data, isLoading, error } = useSWR<
    LoanScheduleSchema[] & { detail: string }
  >(`/api/loans/${loanId}?user_id=${user}`, fetcher);

  if (error) return <p>{`Error: ${error}`}</p>;

  if (data?.hasOwnProperty("detail")) {
    return <p>{`Error: ${data.detail}`}</p>;
  }

  return (
    <>
      <Title>{`Loan ${loanId}`}</Title>
      <SelectLoanRange setFromDate={setFromDate} setToDate={setToDate} />
      {toDate || fromDate ? (
        <>
          <div>{fromDate}</div>
          <div>{toDate}</div>
        </>
      ) : (
        <LoanTable data={data || []} isLoading={isLoading} />
      )}
    </>
  );
};

export default LoanPage;
