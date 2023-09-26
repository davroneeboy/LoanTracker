interface LoanSchemaBase {
  amount: number;
  apr: number;
  term: number;
  status: "active" | "inactive";
  owner_id: number;
}

export default LoanSchemaBase;
