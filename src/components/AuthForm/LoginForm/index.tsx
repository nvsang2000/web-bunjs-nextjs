"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

export default function LoginForm({ onSubmit, loading = false }: any) {
  const [form] = Form.useForm();
  return (
    <Form
      name="basic"
      onFinish={onSubmit}
      autoComplete="off"
      layout={"vertical"}
      colon={false}
      form={form}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter username!" }]}
      >
        <Input
          className="!rounded-[4px]"
          prefix={<UserOutlined />}
          size={"large"}
          placeholder="Enter username, email, phone!"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter password!" }]}
      >
        <Input.Password
          className="!rounded-[4px]"
          prefix={<LockOutlined />}
          size={"large"}
          placeholder="Enter password!"
        />
      </Form.Item>
      <Button
        className={
          "w-full !rounded-[4px] !border !border-[var(--green)] !font-medium !text-[var(--green)]"
        }
        size={"large"}
        htmlType="submit"
        loading={loading}
      >
        Sign in
      </Button>
    </Form>
  );
}
