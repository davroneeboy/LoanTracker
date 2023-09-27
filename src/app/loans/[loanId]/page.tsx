"use client";

import LoanTable from "@/components/LoanTable";
import { useUserContext } from "@/context/user.context";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import fetcher from "@/utils/fetcher";
import { Divider, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const LoanPage = ({ params }: { params: { loanId: string } }) => {
  const { user, setUser } = useUserContext();
  const { loanId } = params;
  const router = useRouter();

  const { data, isLoading, error } = useSWR<LoanScheduleSchema[]>(
    `/api/loans/${loanId}?user_id=${user}`,
    fetcher
  );

  if (error) {
    return <p>{`Error: ${error}`}</p>;
  }

  return (
    <>
      <Title>{`Loan ${loanId}`}</Title>
      <Space size="middle">
        <a onClick={() => router.push(`/loans/${loanId}`)}>🗓️ Schedule</a>
        <a onClick={() => router.push(`/loans/${loanId}/history`)}>
          💰 Payment History
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/update`)}>
          ✏️ Update Loan
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/share`)}>
          ↪️ Share Loan
        </a>
      </Space>
      <Divider />
      <LoanTable data={data || []} isLoading={isLoading} />
    </>
  );
};

export default LoanPage;
