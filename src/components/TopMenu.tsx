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
      label: <Link href="/">Главная</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "Пользователи",
      key: "users",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href="/users">Все пользователи</Link>,
          key: "users-get-all",
          icon: <UsergroupAddOutlined />,
        },
        {
          label: <Link href="/users/create">Создать пользователя</Link>,
          key: "users-create",
          icon: <UserAddOutlined />,
        },
      ],
    },
    {
      label: "Займы",
      key: "loans",
      icon: <BankOutlined />,
      children: [
        {
          label: <Link href={`/users/${user}`}>Мои займы</Link>,
          key: "loans-get-all",
          icon: <CopyOutlined />,
        },
        {
          label: <Link href="/loans/create">Создать займ</Link>,
          key: "loans-create",
          icon: <FormOutlined />,
        },
      ],
    },
  ];

  return (
    <>
      <Menu mode="horizontal" items={items} />
      <Alert message={`Вход выполнен как пользователь ${user}`} type="info" />
    </>
  );
};

export default TopMenu;
