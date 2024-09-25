"use client";

import { Button, Card, Col, Form, Input, Row, Select, message } from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";

interface FormProps {
  initialValues: any;
  id: string | undefined;
  onSubmit: (value: any) => void;
  onRemove: () => void;
}

export default function ToolAirdropForm({
  initialValues = {},
  id = "",
  onSubmit = () => {},
  onRemove = () => {},
}: FormProps) {
  const [form] = Form.useForm();
  return (
    <div>
      <div className="text-[20px] font-semibold mb-[20px]">
        Running tool okx
      </div>
      <Form
        layout={"vertical"}
        colon={false}
        form={form}
        initialValues={initialValues}
        onFinish={onSubmit}
      >
        <Form.Item
          label={<div className="text-[18px] font-medium">Select Tool</div>}
          name={"nameTool"}
        >
          <Select
            size="large"
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            options={[
              {
                value: "TOOL_OKX",
                label: "Tool airdrop OKX",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label={<div className="text-[18px] font-medium">Proxy IP</div>}
        >
          <Form.List name={"proxy"}>
            {(subFields, subOpt) => (
              <div>
                {subFields.map((subField) => (
                  <Row gutter={40} key={subField.key}>
                    <Col xs={22} md={22} xl={22}>
                      <Form.Item name={[subField.name]}>
                        <Input
                          size="large"
                          placeholder="http://username:password@ip:port"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={2} md={24} xl={2}>
                      <Button
                        danger
                        size="large"
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                        icon={<CloseOutlined />}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  onClick={() => subOpt.add()}
                  block
                >
                  ADD PROXY IP
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item
          label={<div className="text-[18px] font-medium">Request ID</div>}
        >
          <Form.List name={"requestId"}>
            {(subFields, subOpt) => (
              <div>
                {subFields.map((subField) => (
                  <Row gutter={40} key={subField.key}>
                    <Col xs={22} md={22} xl={22}>
                      <Form.Item name={[subField.name]}>
                        <Input size="large" placeholder="query_id=*****" />
                      </Form.Item>
                    </Col>
                    <Col xs={2} md={24} xl={2}>
                      <Button
                        danger
                        size="large"
                        onClick={() => {
                          subOpt.remove(subField.name);
                        }}
                        icon={<CloseOutlined />}
                      />
                    </Col>
                  </Row>
                ))}
                <Button
                  size="large"
                  color="primary"
                  variant="outlined"
                  onClick={() => subOpt.add()}
                  block
                >
                  ADD RQUEST ID
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Row gutter={40} className={"py-[40px] pl-[20px]"}>
          <Button size="large" type={"primary"} htmlType={"submit"}>
            Run job
          </Button>
        </Row>
      </Form>
    </div>
  );
}
