"use client";

import { LoansById, useLoanContext } from "@/context/loan.context";
import { useUserContext } from "@/context/user.context";
import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
import { validateNumber } from "@/utils/formValidation";
import { Button, Divider, Form, Input, Select, Space } from "antd";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/navigation";

const UpdateLoan = ({ params }: { params: { loanId: string } }) => {
  const { loanId } = params;
  const router = useRouter();
  const { loans, setLoans } = useLoanContext();
  const { user, setUser } = useUserContext();

  const currentLoan = loans[parseInt(loanId)];

  if (!currentLoan) {
    router.push(`/users/${user}`);
  }

  const { amount, apr, term, status, owner_id: ownerId } = currentLoan;

  const onFinish = async (values: LoanSchemaBase) => {
    try {
      const response = await fetch(`/api/loans/${loanId}?user_id=${user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedLoan: LoanSchema = {
          ...currentLoan,
          ...values,
        };

        const updatedLoans: LoansById = {
          ...loans,
          [updatedLoan.id]: updatedLoan,
        };

        setLoans(updatedLoans);

        const data: LoanSchema = await response.json();
        if (data?.id) {
          router.push(`/loans/${data.id}`);
        } else {
          router.push(`/users/${user}`);
        }
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
    <>
      <Title>{`Обновить займ ${loanId}`}</Title>
      <Space size="middle">
        <a onClick={() => router.push(`/loans/${loanId}`)}>🗓️ График</a>
        <a onClick={() => router.push(`/loans/${loanId}/history`)}>
          💰 История платежей
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/update`)}>
          ✏️ Обновить займ
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/share`)}>
          ↪️ Предоставить займ
        </a>
      </Space>
      <Divider />
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
          initialValue={amount}
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
          initialValue={apr}
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
          initialValue={term}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Статус"
          name="status"
          rules={[{ required: true, message: "Пожалуйста, выберите статус!" }]}
          initialValue={status}
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
          initialValue={ownerId}
        >
          <Input type="number" disabled={true} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {user === ownerId ? (
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" disabled={true}>
              Только владельцы могут изменять займ
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateLoan;
