import { useUserContext } from "@/context/user.context";
import LoanSummarySchema from "@/types/loanSummary.type";
import appendKeyProp from "@/utils/appendKeyProp";
import monthToPaymentDate from "@/utils/monthToPaymentDate";
import React, { useEffect, useState } from "react";
import LoanRangeTable from "./LoanRangeTable";
import ErrorMessage from "./ErrorMessage";

const applyDateLimit = (month: number | null) =>
  month === null || month < 0 ? 0 : month;

const fetchMonthlyLoanSummary = async (
  loanId: string,
  userId: number,
  month: number
) => await fetch(`/api/loans/${loanId}/month/${month}?user_id=${userId}`);

type LoanRangeProps = {
  loanId: string;
  fromDate: number | null;
  toDate: number | null;
};

const LoanRange: React.FC<LoanRangeProps> = ({ loanId, fromDate, toDate }) => {
  const [summary, setSummary] = useState([] as LoanSummarySchema[]);
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rangeLength = toDate
          ? applyDateLimit(toDate) - applyDateLimit(fromDate)
          : applyDateLimit(fromDate);

        const promises = Array.from({ length: rangeLength }, (_, i) =>
          fetchMonthlyLoanSummary(loanId, user, i + 1)
        );

        const results = await Promise.allSettled(promises);
        const fulfilledResults = results.filter(
          (result) => result.status === "fulfilled"
        );
        const responses = fulfilledResults.map((result) => {
          if (result.status === "fulfilled") {
            const fulfilledResult = result as PromiseFulfilledResult<Response>;
            return fulfilledResult.value;
          }
        });

        const jsonDataPromises = responses.map(async (response) => {
          if (response?.status === 200) {
            return await response.json();
          } else {
            return null;
          }
        });

        const data = (await Promise.all(jsonDataPromises)).filter(
          (d) => d !== null
        );
        setSummary(data);
      } catch (error) {
        return <ErrorMessage message={`${JSON.stringify(error)}`} />;
      }
    };
    fetchData();
  }, [fromDate, loanId, toDate, user]);

  const datedSummary = summary.map((s, i) => ({
    ...s,
    payment_date: monthToPaymentDate(i + applyDateLimit(fromDate)),
  }));

  return <LoanRangeTable data={appendKeyProp(datedSummary)} />;
};

export default LoanRange;
