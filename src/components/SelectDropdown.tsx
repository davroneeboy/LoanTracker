import React, { useState } from "react";
import { Button, Divider, Select, notification } from "antd";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user.context";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectDropdown: React.FC<any> = ({ loanId, options }) => {
  const [userId, setUserId] = useState("");
  const onChange = (value: string) => setUserId(value);
  const { user: ownerId, setUser: setOwnerId } = useUserContext();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const openNotification = (message: string) =>
    api.open({
      message,
    });

  return (
    <>
      {contextHolder}
      <Select
        showSearch
        placeholder="Select a User"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        options={options}
      />
      <Divider />
      <Button
        type="primary"
        onClick={async () => {
          const url = `/api/loans/${loanId}/share?owner_id=${ownerId}&user_id=${userId}`;
          const res = await fetch(url, {
            cache: "no-store",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();

          if (data && data[0]) {
            if (data[0] === "success") {
              openNotification("Loan Sharing Successful");
              router.push(`/users/${userId}`);
            } else {
              openNotification(`${JSON.stringify(data)}`);
            }
          } else {
            openNotification(`${JSON.stringify(data)}`);
          }
        }}
      >
        Share Loan
      </Button>
    </>
  );
};

export default SelectDropdown;
