"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import UserSchemaBase from "@/types/userBase.type";
import { useRouter } from "next/navigation";
import UserSchema from "@/types/user.type";
import Title from "antd/es/typography/Title";
import { validateUsername } from "@/utils/formValidation";

const CreateUserForm = () => {
  const router = useRouter();

  const onFinish = async (values: UserSchemaBase) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data: UserSchema = await response.json();
        router.push(`/users/${data.id}`);
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
      <Form.Item<UserSchemaBase>
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input a username!" },
          { validator: validateUsername },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const CreateUser = () => (
  <>
    <Title>Create User</Title>
    <CreateUserForm />
  </>
);

export default CreateUser;
