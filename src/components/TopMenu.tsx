"use client";

import React, { useState } from "react";
import {
  BankOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: <a href="/">Home</a>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Users",
    key: "users",
    icon: <UserOutlined />,
    children: [
      {
        label: <a href="/users/create">Create User</a>,
        key: "users-create",
        icon: <UserAddOutlined />,
      },
      {
        label: <a href="/users">Get All Users</a>,
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
        label: <a href="/users">Create Loan</a>,
        key: "loans-create",
      },
      {
        label: <a href="/users">Get All Loans</a>,
        key: "loans-get-all",
      },
    ],
  },
];

const TopMenu = () => <Menu mode="horizontal" items={items} />;

export default TopMenu;
