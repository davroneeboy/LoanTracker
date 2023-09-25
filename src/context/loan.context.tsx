"use client";

import LoanSchema from "@/types/loan.type";
import { ReactNode, createContext, useContext, useState } from "react";

export type LoansById = {
  [id: number]: LoanSchema;
};

type LoanContextType = {
  loans: LoansById;
  setLoans: React.Dispatch<React.SetStateAction<LoansById>>;
};

const LoanContext = createContext<LoanContextType>({} as LoanContextType);

export const LoanContextProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState({});

  return (
    <LoanContext.Provider value={{ loans, setLoans }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoanContext = () => useContext(LoanContext);

export const mapLoansToLoansById = (loans: LoanSchema[]): LoansById =>
  loans.reduce((acc, loan) => {
    acc[loan.id] = loan;
    return acc;
  }, {} as LoansById);
