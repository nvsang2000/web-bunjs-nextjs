import { Layout } from "antd";

const { Content } = Layout;
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className="site-layout">
      <Content className={"p-[20px]"}>{children}</Content>
    </Layout>
  );
}
