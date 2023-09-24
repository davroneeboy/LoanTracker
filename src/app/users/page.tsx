"use client";

import useSWR from "swr";
import User from "@/types/user.type";
import fetcher, { glAPI } from "@/utils/fetcher";

const Users = () => {
  const { data, error } = useSWR<User[]>(`${glAPI}/users`, fetcher);

  if (!data) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error}`}</p>;

  return (
    <div>
      <h1>All Users</h1>
      {data.map((user) => (
        <div key={user.id + user.username}>
          {user.id + ": " + user.username}
        </div>
      ))}
    </div>
  );
};

export default Users;
