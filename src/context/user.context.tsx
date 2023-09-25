"use client";

import { ReactNode, createContext, useContext, useState } from "react";

type UserContextType = {
  user: number;
  setUser: React.Dispatch<React.SetStateAction<number>>;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(1);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
