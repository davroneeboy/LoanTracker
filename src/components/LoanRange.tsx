import { useUserContext } from "@/context/user.context";
import LoanSummarySchema from "@/types/loanSummary.type";
import { HTTPValidationError } from "@/types/validationError.type";
import appendKeyProp from "@/utils/appendKeyProp";
import monthToPaymentDate from "@/utils/monthToPaymentDate";
import React, { useEffect, useState } from "react";
import LoanRangeTable from "./LoanRangeTable";

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
  const [summary, setSummary] = useState(
    [] as (LoanSummarySchema | HTTPValidationError)[]
  );
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

        const results = await Promise.all(promises);
        const data = await Promise.all(results.map((result) => result.json()));
        setSummary(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [fromDate, loanId, toDate, user]);

  const validSummary = summary.filter(
    (el) => !el.hasOwnProperty("detail")
  ) as LoanSummarySchema[];

  const datedSummary = validSummary.map((summary, i) => ({
    ...summary,
    payment_date: monthToPaymentDate(i + applyDateLimit(fromDate)),
  }));

  return <LoanRangeTable data={appendKeyProp(datedSummary)} />;
};

export default LoanRange;
