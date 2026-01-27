"use client";

import { useUserContext } from "@/context/user.context";
import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import { validateNumber } from "@/utils/formValidation";
import { Form, Input, Button, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

const CreateLoanForm = () => {
  const { user, setUser } = useUserContext();
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
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Сумма"
        name="amount"
        rules={[
          { required: true, message: "Пожалуйста, введите сумму!" },
          { validator: validateNumber },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Годовая процентная ставка"
        name="apr"
        rules={[
          { required: true, message: "Пожалуйста, введите годовую процентную ставку!" },
          { validator: validateNumber },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Срок"
        name="term"
        rules={[
          { required: true, message: "Пожалуйста, введите срок!" },
          { validator: validateNumber },
        ]}
        initialValue={30}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Статус"
        name="status"
        rules={[{ required: true, message: "Пожалуйста, выберите статус!" }]}
        initialValue={"active"}
      >
        <Select
          options={[
            { value: "active", label: "Активный" },
            { value: "inactive", label: "Неактивный" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="ID владельца"
        name="owner_id"
        rules={[{ required: true, message: "Пожалуйста, введите ID владельца!" }]}
        initialValue={user}
      >
        <Input type="number" disabled={true} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateLoan = () => {
  const { user, setUser } = useUserContext();
  return (
    <>
      <Title>{`Создать займ для пользователя ${user}`}</Title>
      <CreateLoanForm />
    </>
  );
};

export default CreateLoan;
