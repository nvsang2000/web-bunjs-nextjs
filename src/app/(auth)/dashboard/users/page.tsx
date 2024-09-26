"use client";

import { Button, Col, Row, Switch, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import dayjsInstance from "@/utils/dayjs";
import { useUser } from "@/hooks";

export default function UsersPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const { push, replace } = useRouter();
  const [meta, setMeta] = useState({});
  const parmas = useSearchParams();
  const { users } = useUser();

  const columns = [

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 250,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 250,
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      width: 150,
      render: (_: any, record: any) => {
        return (
          <div>
            <Switch
              size="small"
              checked={record?.active}
              // onChange={(checked) => onActiveChange(checked, record?.id)}
            />
          </div>
        );
      },
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 80,
      render: (_: any, record: any) => {
        return (
          <div>{dayjsInstance(record?.created_at).format("DD/MM/YYYY")}</div>
        );
      },
    },
  ];


  return (
    <>
      <div className="bg-white p-[40px] rounded-[6px] mb-[20px]">
        <Row gutter={10} className={"mb-[8px]"}>
          <Col flex={1}>
            <div className={"text-[18px] font-medium"}>
              {/* <span className={"mr-[10px] text-[color:var(--green)]"}>
                {numberFormat(meta?.total || 0)}
              </span> */}
              Users
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => push(`/dashboard/users/create`)}
            >
              Create new
            </Button>
          </Col>
        </Row>
      </div>
      <div className="bg-white p-[40px] rounded-[6px]">
        <Table
          rowKey={(record) => record?.id + ""}
          dataSource={users}
          columns={columns}
          pagination={{
            // total: meta?.total,
            pageSize: +(parmas.get("limit") || 10),
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50, 100, 200],
            // onChange: (page: number, pageSize: number) => {
            //   replaceParams({ page, limit: pageSize });
            // },
            current: +(parmas.get("page") || 1),
          }}
        />
      </div>
    </>
  );
}
