"use client";

import useSWR from "swr";
import UserSchema from "@/types/user.type";
import fetcher from "@/utils/fetcher";

const Users = () => {
  const { data, isLoading, error } = useSWR<UserSchema[]>(`api/users`, fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{`Error: ${error}`}</p>;

  return (
    <div>
      <h1>All Users</h1>
      {data?.map((user) => (
        <div key={user.id + user.username}>
          {user.id + ": " + user.username}
        </div>
      ))}
    </div>
  );
};

export default Users;
