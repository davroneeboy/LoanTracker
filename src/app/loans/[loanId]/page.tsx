"use client";

import { useUserContext } from "@/context/user.context";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import fetcher from "@/utils/fetcher";
import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const LoanPage = ({ params }: { params: { loanId: string } }) => {
  const router = useRouter();
  const { user, setUser } = useUserContext();
  const { loanId } = params;

  const {
    data = [],
    isLoading,
    error,
  } = useSWR<LoanScheduleSchema[]>(
    `/api/loans/${loanId}?user_id=${user}`,
    fetcher
  );

  if (error) return <p>{`Error: ${error}`}</p>;

  const rollingTotalInterest = data
    .map((d) => d.interest_payment)
    .reduce((acc, currPayment) => {
      if (acc.length === 0) {
        acc.push(currPayment);
      } else {
        acc.push(currPayment + acc[acc.length - 1]);
      }
      return acc;
    }, [] as number[]);

  const columns: ColumnsType<LoanScheduleSchema> = [
    {
      title: "Payment Date",
      dataIndex: "month",
      key: "paymentDate",
      render: (month) => month,
    },
    {
      title: "Payment",
      dataIndex: "total_payment",
      key: "totalPayment",
      render: (payment) =>
        payment.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Principal",
      dataIndex: "principal_payment",
      key: "principalPayment",
      render: (payment) =>
        payment.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Interest Payment",
      dataIndex: "interest_payment",
      key: "interestPayment",
      render: (payment) =>
        payment.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Total Interest",
      dataIndex: "total_interest",
      key: "totalInterest",
      render: (_, record, index) =>
        rollingTotalInterest[index].toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Balance",
      dataIndex: "close_balance",
      key: "closeBalance",
      render: (balance) =>
        balance.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
  ];

  return (
    <>
      <Title>{`Loan ${loanId}`}</Title>
      <Table
        style={{ width: "50%" }}
        columns={columns}
        dataSource={data}
        pagination={false}
        loading={{ size: "large", spinning: isLoading }}
      />
    </>
  );
};

export default LoanPage;
