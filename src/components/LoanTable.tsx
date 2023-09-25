import LoanScheduleSchema from "@/types/loanSchedule.type";
import appendKeyProp from "@/utils/appendKeyProp";
import monthToPaymentDate from "@/utils/monthToPaymentDate";
import Table, { ColumnsType } from "antd/es/table";

const LoanTable = ({
  data,
  isLoading,
}: {
  data: LoanScheduleSchema[];
  isLoading?: boolean;
}) => {
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
    <Table
      style={{ width: "50%" }}
      columns={columns}
      dataSource={appendKeyProp(data)}
      pagination={false}
      loading={{ size: "large", spinning: isLoading }}
    />
  );
};

export default LoanTable;
