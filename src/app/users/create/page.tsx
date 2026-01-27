"use client";

import React from "react";
import { Button, Form, Input } from "antd";
import UserSchemaBase from "@/types/userBase.type";
import { useRouter } from "next/navigation";
import UserSchema from "@/types/user.type";
import { validateUsername } from "@/utils/formValidation";
import { UserAddOutlined } from "@ant-design/icons";

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
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Создать пользователя
        </h1>
        <p className="text-slate-500">Добавьте нового пользователя в систему</p>
      </div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-4"
      >
        <Form.Item<UserSchemaBase>
          label={<span className="text-slate-700 font-medium">Имя пользователя</span>}
          name="username"
          rules={[
            { required: true, message: "Пожалуйста, введите имя пользователя!" },
            { validator: validateUsername },
          ]}
        >
          <Input
            size="large"
            placeholder="Введите имя пользователя"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<UserAddOutlined />}
            className="w-full bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 rounded-lg h-11 font-medium"
          >
            Создать пользователя
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const CreateUser = () => <CreateUserForm />;

export default CreateUser;
