"use client";
import { EMAIL_PATTERN } from "@/constants";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";
import { useState } from "react";

export default function LoginForm({ onSubmit, loading = false }: any) {
  const [loginIsEmail, setLoginIsEmail] = useState(false);
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
      {!loginIsEmail ? (
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter username!" }]}
        >
          <Input
            className="!rounded-[4px]"
            prefix={<UserOutlined />}
            size={"large"}
            placeholder="Enter username!"
          />
        </Form.Item>
      ) : (
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter email!" },
            {
              pattern: EMAIL_PATTERN,
              message: "Please enter the correct format email!",
            },
          ]}
        >
          <Input
            className="!rounded-[4px]"
            prefix={<UserOutlined />}
            size={"large"}
            placeholder="Enter email!"
          />
        </Form.Item>
      )}

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
