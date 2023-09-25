"use client";

import React from "react";
import {
  BankOutlined,
  CopyOutlined,
  FormOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Alert, Menu } from "antd";
import { useUserContext } from "@/context/user.context";
import Link from "next/link";

const TopMenu = () => {
  const { user, setUser } = useUserContext();
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
          label: <Link href="/users">Get All Users</Link>,
          key: "users-get-all",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: <Link href="/users/create">Create User</Link>,
          key: "users-create",
          icon: <UserAddOutlined />,
        },
      ],
    },
    {
      label: "Loans",
      key: "loans",
      icon: <BankOutlined />,
      children: [
        {
          label: <Link href={`/users/${user}`}>My Loans</Link>,
          key: "loans-get-all",
          icon: <CopyOutlined />,
        },
        {
          label: <Link href="/loans/create">Create Loan</Link>,
          key: "loans-create",
          icon: <FormOutlined />,
        },
      ],
    },
  ];

  return (
    <>
      <Menu mode="horizontal" items={items} />
      <Alert message={`Logged in as User ${user}`} type="info" />
    </>
  );
};

export default TopMenu;
