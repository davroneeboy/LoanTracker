"use client";

import { LoansById, useLoanContext } from "@/context/loan.context";
import { useUserContext } from "@/context/user.context";
import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
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
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Title>{`Update Loan ${loanId}`}</Title>
      <Space size="middle">
        <a onClick={() => router.push(`/loans/${loanId}`)}>🗓️ Schedule</a>
        <a onClick={() => router.push(`/loans/${loanId}/history`)}>
          💰 Payment History
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/update`)}>
          ✏️ Update Loan
        </a>
        <a onClick={() => router.push(`/loans/${loanId}/share`)}>
          ↪️ Share Loan
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
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input an amount!" }]}
          initialValue={amount}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="APR"
          name="apr"
          rules={[{ required: true, message: "Please input the APR!" }]}
          initialValue={apr}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Term"
          name="term"
          rules={[{ required: true, message: "Please input the term!" }]}
          initialValue={term}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status!" }]}
          initialValue={status}
        >
          <Select
            options={[
              { value: "active", label: "Active" },
              { value: "approved", label: "Approved" },
              { value: "inactive", label: "Inactive" },
              { value: "forbearance", label: "Forbearance" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Owner ID"
          name="owner_id"
          rules={[{ required: true, message: "Please input an owner ID!" }]}
          initialValue={ownerId}
        >
          <Input type="number" disabled={true} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {user === ownerId ? (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          ) : (
            <Button type="primary" htmlType="submit" disabled={true}>
              Only Owners Can Change Loan
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateLoan;
