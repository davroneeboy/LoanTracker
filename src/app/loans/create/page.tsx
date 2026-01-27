"use client";

import { useUserContext } from "@/context/user.context";
import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import { validateNumber } from "@/utils/formValidation";
import { Form, Input, Button, Select } from "antd";
import { useRouter } from "next/navigation";
import { BankOutlined, DollarOutlined, CalendarOutlined, CheckCircleOutlined, UserOutlined } from "@ant-design/icons";

const CreateLoanForm = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const onFinish = async (values: LoanSchemaBase) => {
    try {
      const response = await fetch("/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data: LoanSchema = await response.json();
        router.push(`/loans/${data.id}`);
      } else {
        console.error("Ошибка:", response.status);
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Не удалось:", errorInfo);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BankOutlined className="text-3xl text-indigo-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Создать займ
          </h1>
        </div>
        <p className="text-slate-500">
          Создание нового займа для пользователя <span className="font-semibold text-indigo-600">{user}</span>
        </p>
      </div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true, term: 30, status: "active", owner_id: user }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-4"
      >
        <Form.Item
          label={<span className="text-slate-700 font-medium">Сумма займа</span>}
          name="amount"
          rules={[
            { required: true, message: "Пожалуйста, введите сумму!" },
            { validator: validateNumber },
          ]}
        >
          <Input
            type="number"
            size="large"
            prefix={<DollarOutlined className="text-slate-400" />}
            placeholder="Введите сумму займа"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-slate-700 font-medium">Годовая процентная ставка (%)</span>}
          name="apr"
          rules={[
            { required: true, message: "Пожалуйста, введите годовую процентную ставку!" },
            { validator: validateNumber },
          ]}
        >
          <Input
            type="number"
            size="large"
            placeholder="Введите процентную ставку"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-slate-700 font-medium">Срок (месяцы)</span>}
          name="term"
          rules={[
            { required: true, message: "Пожалуйста, введите срок!" },
            { validator: validateNumber },
          ]}
        >
          <Input
            type="number"
            size="large"
            prefix={<CalendarOutlined className="text-slate-400" />}
            placeholder="Введите срок займа"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-slate-700 font-medium">Статус</span>}
          name="status"
          rules={[{ required: true, message: "Пожалуйста, выберите статус!" }]}
        >
          <Select
            size="large"
            className="rounded-lg"
            options={[
              { value: "active", label: "Активный" },
              { value: "inactive", label: "Неактивный" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-slate-700 font-medium">ID владельца</span>}
          name="owner_id"
          rules={[{ required: true, message: "Пожалуйста, введите ID владельца!" }]}
        >
          <Input
            type="number"
            size="large"
            prefix={<UserOutlined className="text-slate-400" />}
            disabled={true}
            className="rounded-lg bg-slate-50"
          />
        </Form.Item>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<CheckCircleOutlined />}
            className="w-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 rounded-lg h-11 font-medium"
          >
            Создать займ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const CreateLoan = () => <CreateLoanForm />;

export default CreateLoan;
