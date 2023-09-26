import React, { useState } from "react";
import { Button, Divider, Select } from "antd";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectDropdown: React.FC<any> = ({ options }) => {
  const [userId, setUserId] = useState("");
  const onChange = (value: string) => setUserId(value);

  return (
    <>
      <Select
        showSearch
        placeholder="Select a User"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        options={options}
      />
      <Divider />
      <Button type="primary" onClick={(e) => console.log(userId, e)}>
        Share Loan
      </Button>
    </>
  );
};

export default SelectDropdown;
