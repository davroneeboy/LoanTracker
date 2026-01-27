"use client";

import React, { useState } from "react";
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
import { Menu } from "antd";
import { useUserContext } from "@/context/user.context";
import Link from "next/link";

const TopMenu = () => {
  const { user } = useUserContext();
  const [current, setCurrent] = useState("");

  const handleClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <HomeOutlined />
          Главная
        </Link>
      ),
      key: "home",
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <UserOutlined />
          Пользователи
        </span>
      ),
      key: "users",
      children: [
        {
          label: (
            <Link
              href="/users"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <UsergroupAddOutlined />
              Все пользователи
            </Link>
          ),
          key: "users-get-all",
        },
        {
          label: (
            <Link
              href="/users/create"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <UserAddOutlined />
              Создать пользователя
            </Link>
          ),
          key: "users-create",
        },
      ],
    },
    {
      label: (
        <span className="flex items-center gap-2">
          <BankOutlined />
          Займы
        </span>
      ),
      key: "loans",
      children: [
        {
          label: (
            <Link
              href={`/users/${user}`}
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <CopyOutlined />
              Мои займы
            </Link>
          ),
          key: "loans-get-all",
        },
        {
          label: (
            <Link
              href="/loans/create"
              className="flex items-center gap-2 hover:text-blue-600 transition-colors"
            >
              <FormOutlined />
              Создать займ
            </Link>
          ),
          key: "loans-create",
        },
      ],
    },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <BankOutlined className="text-2xl text-indigo-600" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Loan Tracker
            </h1>
          </div>
          <Menu
            mode="horizontal"
            items={items}
            onClick={handleClick}
            selectedKeys={[current]}
            className="border-none bg-transparent flex-1 justify-end"
          />
          <div className="ml-4 px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-100">
            <span className="text-sm text-slate-600">
              Пользователь: <span className="font-semibold text-indigo-600">{user}</span>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
