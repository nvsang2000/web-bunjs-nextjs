"use client";

import { Button, Col, Row, Space, Switch, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjsInstance from "../../../../utils/dayjs";
import { paginateToolAirdrop } from "../../../../actions/tool";

export default function UsersPage({
  searchParams,
}: {
  searchParams?: any;
}) {
  const { push, replace } = useRouter();
  const [users, setUsers] = useState<any>([]);
  const parmas = useSearchParams();

  const loadData = async() => {
    const { data } = await paginateToolAirdrop()
    if(data) {
      setUsers(data)
    }
  }
  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = [
    {
      title: "Tool",
      dataIndex: "nameTool",
      key: "nameTool",
      width: 250,
    },
    {
      title: "proxy",
      dataIndex: "proxy",
      key: "proxy",
      width: 250,
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      width: 250,
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
              Tool JOB
            </div>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => push(`/dashboard/tools-airdrop/create`)}
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
