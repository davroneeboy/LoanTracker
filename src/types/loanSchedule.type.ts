interface LoanScheduleSchema {
  month: number;
  open_balance: number;
  total_payment: number;
  principal_payment: number;
  interest_payment: number;
  close_balance: number;
}

export default LoanScheduleSchema;
