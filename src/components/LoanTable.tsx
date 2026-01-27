import LoanScheduleSchema from "@/types/loanSchedule.type";
import appendKeyProp from "@/utils/appendKeyProp";
import monthToPaymentDate from "@/utils/monthToPaymentDate";
import Table, { ColumnsType } from "antd/es/table";

const rollingTotalInterest = (data: LoanScheduleSchema[]) =>
  data
    .map((d) => d.interest_payment)
    .reduce((acc, currPayment) => {
      if (acc.length === 0) {
        acc.push(currPayment);
      } else {
        acc.push(currPayment + acc[acc.length - 1]);
      }
      return acc;
    }, [] as number[]);

const LoanTable = ({
  data,
  isLoading,
}: {
  data: LoanScheduleSchema[];
  isLoading?: boolean;
}) => {
  const columns: ColumnsType<LoanScheduleSchema> = [
    {
      title: "Дата платежа",
      dataIndex: "month",
      key: "paymentDate",
      render: (month) => (
        <span className="text-slate-700 font-medium">
          {monthToPaymentDate(month)}
        </span>
      ),
    },
    {
      title: "Платеж",
      dataIndex: "total_payment",
      key: "totalPayment",
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
      title: "Основной долг",
      dataIndex: "principal_payment",
      key: "principalPayment",
      render: (payment) => (
        <span className="text-slate-700">
          {payment.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
    {
      title: "Процентный платеж",
      dataIndex: "interest_payment",
      key: "interestPayment",
      render: (payment) => (
        <span className="text-orange-600 font-medium">
          {payment.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
    {
      title: "Общий процент",
      dataIndex: "total_interest",
      key: "totalInterest",
      render: (_, record, index) => (
        <span className="text-orange-600 font-semibold">
          {rollingTotalInterest(data)[index].toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
    {
      title: "Баланс",
      dataIndex: "close_balance",
      key: "closeBalance",
      render: (balance) => (
        <span className="text-indigo-600 font-semibold">
          {balance.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">График платежей</h2>
        <p className="text-sm text-slate-500 mt-1">
          Детальная информация о платежах по займу
        </p>
      </div>
      <Table
        columns={columns}
        dataSource={appendKeyProp(data)}
        pagination={{
          pageSize: 12,
          showSizeChanger: true,
          showTotal: (total) => `Всего платежей: ${total}`,
        }}
        loading={{ size: "large", spinning: isLoading }}
        rowClassName="hover:bg-indigo-50/50 transition-colors"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default LoanTable;
