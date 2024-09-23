"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

export default function RegisterForm({ onSubmit }: any) {
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
          placeholder="Enter username"
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please enter email!" }]}
      >
        <Input
          className="!rounded-[4px]"
          prefix={<UserOutlined />}
          size={"large"}
          placeholder="Enter email"
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
          placeholder="Enter password"
        />
      </Form.Item>
      <Form.Item
        name="password_confirm"
        rules={[
          { required: true, message: "Please enter confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Password does not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          className="!rounded-[4px]"
          prefix={<LockOutlined />}
          size={"large"}
          placeholder="Enter password"
        />
      </Form.Item>
      <Button
        className={
          "w-full !rounded-[4px] !border !border-[var(--green)] !font-medium !text-[var(--green)]"
        }
        size={"large"}
        htmlType="submit"
      >
        Sign up
      </Button>
    </Form>
  );
}
