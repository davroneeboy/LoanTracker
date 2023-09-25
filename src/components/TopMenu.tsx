"use client";

import React from "react";
import {
  BankOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Alert, Avatar, Menu } from "antd";
import { useUserContext } from "@/context/user.context";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const items: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Users",
    key: "users",
    icon: <UserOutlined />,
    children: [
      {
        label: <Link href="/users/create">Create User</Link>,
        key: "users-create",
        icon: <UserAddOutlined />,
      },
      {
        label: <Link href="/users">Get All Users</Link>,
        key: "users-get-all",
        icon: <UsergroupAddOutlined />,
      },
    ],
  },
  {
    label: "Loans",
    key: "loans",
    icon: <BankOutlined />,
    children: [
      {
        label: <Link href="/users">Create Loan</Link>,
        key: "loans-create",
      },
      {
        label: <Link href="/users">Get All Loans</Link>,
        key: "loans-get-all",
      },
    ],
  },
];

const TopMenu = () => {
  const { user, setUser } = useUserContext();
  return (
    <>
      <Menu mode="horizontal" items={items} />
      <Alert message={`Logged in as User ${user}`} type="info" />
    </>
  );
};

export default TopMenu;
