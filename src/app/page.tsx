"use client";

import { useUserContext } from "@/context/user.context";

const App = () => {
  const { user, setUser } = useUserContext();
  return <div>Hello World</div>;
};

export default App;
