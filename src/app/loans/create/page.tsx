"use client";

import { useUserContext } from "@/context/user.context";
import LoanSchema from "@/types/loan.type";
import LoanSchemaBase from "@/types/loanBase.type";
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
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="APR"
        name="apr"
        rules={[{ required: true, message: "Please input the APR!" }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Term"
        name="term"
        rules={[{ required: true, message: "Please input the term!" }]}
        initialValue={30}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select a status!" }]}
        initialValue={"active"}
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
        initialValue={user}
      >
        <Input type="number" disabled={true} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateLoan = () => {
  const { user, setUser } = useUserContext();
  return (
    <>
      <Title>{`Create Loan for User ${user}`}</Title>
      <CreateLoanForm />
    </>
  );
};

export default CreateLoan;
