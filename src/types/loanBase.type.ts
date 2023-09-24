interface LoanSchemaBase {
    amount: number;
    apr: number;
    term: number;
    status: string;
    owner_id: number;
  }
  
  export default LoanSchemaBase;
  