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
      title: "Дата платежа",
      dataIndex: "payment_date",
      key: "paymentDate",
      render: (date) => (
        <span className="text-slate-700 font-medium">{date}</span>
      ),
    },
    {
      title: "Текущий основной долг",
      dataIndex: "current_principal",
      key: "currentPrincipal",
      render: (payment) => (
        <span className="text-slate-800 font-semibold">
          {payment.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
    {
      title: "Всего выплачено основного долга",
      dataIndex: "aggregate_principal_paid",
      key: "aggregatePrincipalPaid",
      render: (payment) => (
        <span className="text-green-600 font-semibold">
          {payment.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
    {
      title: "Всего выплачено процентов",
      dataIndex: "aggregate_interest_paid",
      key: "aggregateInterestPaid",
      render: (payment) => (
        <span className="text-orange-600 font-semibold">
          {payment.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={appendKeyProp(data)}
      pagination={{
        pageSize: 12,
        showSizeChanger: true,
        showTotal: (total) => `Всего записей: ${total}`,
      }}
      rowClassName="hover:bg-indigo-50/50 transition-colors"
      scroll={{ x: "max-content" }}
    />
  );
};

export default LoanRangeTable;
