"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserOutlined, RocketOutlined } from '@ant-design/icons';
const { Content, Sider } = Layout;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [tabActive, setTabActive] = useState(pathname.split("/")[2]);

  useEffect(() => {
    setTabActive(pathname.split("/")[2]);
  }, [pathname]);

  const defaultItem = [
    {
      key: "users",
      icon: <UserOutlined />,
      label: <Link href={"/dashboard/users"}>Users</Link>,
      children: undefined,
    },
    {
      key: "tools",
      icon: <RocketOutlined />,
      label: <Link href={"/dashboard/tools-airdrop"}>Tools Airdrop</Link>,
      children: undefined,
    },
  ];

  return (
    <Layout hasSider>
      <Sider
        className={"!bg-[#001529]"}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className={"flex justify-center cursor-pointer p-[10px] px-5"}>
          <div className="text-2xl font-bold text-blue-600">HIDEV</div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[tabActive]}
          defaultOpenKeys={[tabActive]}
          items={defaultItem}
          onClick={({ key }) => setTabActive(key)}
        />
      </Sider>
      <Layout className="ml-[200px]">
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
