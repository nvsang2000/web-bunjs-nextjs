"use client";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import runToolOKX from "../../../../../actions/tool";

export default function ToolDetail() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const { mess, code } = await runToolOKX(values);
      if (code === 200) message.info(mess);
    } catch (error) {
      message.error("Error server!");
    }
  };

  return (
    <div className="bg-white p-[40px] rounded-[6px] mb-[20px]">
      <Form
        layout={"vertical"}
        colon={false}
        form={form}
        initialValues={{}}
        onFinish={handleSubmit}
      >
        <Form.List name="jobAirdrop">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
              {fields.map((field) => (
                <Card
                  size="small"
                  title={
                    <div className="text-[18px] font-semibold">
                      JOB {field.name + 1}
                    </div>
                  }
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label={
                      <div className="text-[18px] font-semibold">
                        Select Tool
                      </div>
                    }
                    name={[field.name, "nameTool"]}
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
                    label={
                      <div className="text-[18px] font-semibold">Proxy IP</div>
                    }
                  >
                    <Form.List name={[field.name, "proxy"]}>
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
                    label={
                      <div className="text-[18px] font-semibold">
                        Request ID
                      </div>
                    }
                  >
                    <Form.List name={[field.name, "requestId"]}>
                      {(subFields, subOpt) => (
                        <div>
                          {subFields.map((subField) => (
                            <Row gutter={40} key={subField.key}>
                              <Col xs={22} md={22} xl={22}>
                                <Form.Item name={[subField.name]}>
                                  <Input
                                    size="large"
                                    placeholder="query_id=*****"
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
                            ADD RQUEST ID
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button
                size="large"
                color="primary"
                variant="outlined"
                onClick={() => add()}
                block
              >
                ADD JOB ARDROP
              </Button>
            </div>
          )}
        </Form.List>
        <Row gutter={40} className={"py-[40px] pl-[20px]"}>
          <Button type={"primary"} htmlType={"submit"}>
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
}
