import LoanSummarySchema from "@/types/loanSummary.type";
import appendKeyProp from "@/utils/appendKeyProp";
import Table, { ColumnsType } from "antd/es/table";

type LoanRangeData = LoanSummarySchema & {
  key: string;
  payment_date: string;
};

const LoanRangeTable = ({
  data,
}: {
  data: LoanRangeData[];
  isLoading?: boolean;
}) => {
  const columns: ColumnsType<LoanRangeData> = [
    {
      title: "Payment Date",
      dataIndex: "payment_date",
      key: "paymentDate",
    },
    {
      title: "Current Principal",
      dataIndex: "current_principal",
      key: "currentPrincipal",
      render: (payment) =>
        payment.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Aggregate Principal Paid",
      dataIndex: "aggregate_principal_paid",
      key: "aggregatePrincipalPaid",
      render: (payment) =>
        payment.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    {
      title: "Aggregate Interest Paid",
      dataIndex: "aggregate_interest_paid",
      key: "aggregateInterestPaid",
      render: (payment) =>
        payment.toLocaleString("en-US", {
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
    />
  );
};

export default LoanRangeTable;
