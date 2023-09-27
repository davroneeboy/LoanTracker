"use client";

import ErrorMessage from "@/components/ErrorMessage";
import LoanTable from "@/components/LoanTable";
import { useUserContext } from "@/context/user.context";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import { ApiValidationError } from "@/types/validationError.type";
import fetcher from "@/utils/fetcher";
import { Alert, Divider, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const LoanPage = ({ params }: { params: { loanId: string } }) => {
  const { user, setUser } = useUserContext();
  const { loanId } = params;
  const router = useRouter();

  const { data, isLoading, error } = useSWR<
    LoanScheduleSchema[] & ApiValidationError
  >(`/api/loans/${loanId}?user_id=${user}`, fetcher);

  if (data?.error) {
    return <ErrorMessage message={`${data.error.detail}`} />;
  }

  if (error) {
    return <ErrorMessage message={`${JSON.stringify(error)}`} />;
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
