import React, { useState } from "react";
import { Button, Select, notification } from "antd";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user.context";
import { ShareAltOutlined } from "@ant-design/icons";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectDropdown: React.FC<any> = ({ loanId, options }) => {
  const [userId, setUserId] = useState("");
  const onChange = (value: string) => setUserId(value);
  const { user: ownerId } = useUserContext();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const handleShare = async () => {
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
        api.success({
          message: "Успешно",
          description: "Займ успешно предоставлен",
          placement: "topRight",
        });
        router.push(`/users/${userId}`);
      } else {
        api.error({
          message: "Ошибка",
          description: JSON.stringify(data),
          placement: "topRight",
        });
      }
    } else {
      api.error({
        message: "Ошибка",
        description: JSON.stringify(data),
        placement: "topRight",
      });
    }
  };

  return (
    <div className="space-y-6">
      {contextHolder}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Выберите пользователя
        </label>
        <Select
          showSearch
          placeholder="Выберите пользователя из списка"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={options}
          size="large"
          className="w-full rounded-lg"
        />
      </div>
      <Button
        type="primary"
        size="large"
        icon={<ShareAltOutlined />}
        onClick={handleShare}
        disabled={!userId}
        className="w-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 rounded-lg h-11 font-medium disabled:opacity-50"
      >
        Предоставить займ
      </Button>
    </div>
  );
};

export default SelectDropdown;
