"use client";

import { useUserContext } from "@/context/user.context";
import LoanScheduleSchema from "@/types/loanSchedule.type";
import fetcher from "@/utils/fetcher";
import monthToPaymentDate from "@/utils/monthToPaymentDate";
import Table, { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";
import useSWR from "swr";

const LoanPage = ({ params }: { params: { loanId: string } }) => {
  const { user, setUser } = useUserContext();
  const { loanId } = params;

  const { data, isLoading, error } = useSWR<
    LoanScheduleSchema[] & { detail: string }
  >(`/api/loans/${loanId}?user_id=${user}`, fetcher);

  if (error) return <p>{`Error: ${error}`}</p>;

  if (data?.hasOwnProperty("detail")) {
    return <p>{data.detail}</p>;
  }

  const rollingTotalInterest = (data || [])
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
      render: (month) => monthToPaymentDate(month),
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
