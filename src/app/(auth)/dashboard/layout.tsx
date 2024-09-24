import "../../../app/globals.css";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../../../actions/auth";
import { DashboardLayout } from "../../../components";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Share knowledge with the community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await getCurrentUser();
  if (!data || data?.role !== "ADMIN") return redirect("/login");

  return (
    <AntdRegistry>
      <DashboardLayout>{children}</DashboardLayout>
    </AntdRegistry>
  );
}
