import "../../app/globals.css";
import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Login",
  description: "Share knowledge with the community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      {children}
    </AntdRegistry>
  );
}
