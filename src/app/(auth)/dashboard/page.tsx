"use client";
import Image from "next/image";
import { Layout } from "antd";

import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";

const { Content } = Layout;
const { TextArea } = Input;

export default function DashboardPage() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("values", values);

    fetch("/api/tool")
      .then((res) => res.json())
      .then((data) => console.log("data"))
      .catch((err) => console.log("data"));
  };
  return (
    <Layout>
      <Content>
        <div className="mt-[20px] p-[20px]">
          <Form
            layout={"vertical"}
            colon={false}
            form={form}
            initialValues={{}}
            onFinish={handleSubmit}
          >
            <Row gutter={20}>
              <Col xs={24} lg={24}>
                <Form.Item
                  name="reuqestId"
                  rules={[{ required: true, message: "Please enter id!" }]}
                >
                  <TextArea
                    size="large"
                    rows={4}
                    placeholder="Enter reques id or id!"
                  />
                </Form.Item>

                <Form.Item
                  name="proxy"
                  rules={[{ required: true, message: "Please enter proxy!" }]}
                >
                  <TextArea size="large" rows={4} placeholder="Enter proxy!" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={40} className={"pb-[40px] pl-[20px]"}>
              <Button type={"primary"} htmlType={"submit"}>
                Submit
              </Button>
            </Row>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}
