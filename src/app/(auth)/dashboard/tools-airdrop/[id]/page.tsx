"use client";

import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToolAirdropForm } from "../../../../../components";
import runToolOKX from "../../../../../actions/tool";

export default function DetailBlogPage({ params }: { params: { id: string } }) {
  const [initialValues, setInitialValues] = useState<any>({});
  const { back } = useRouter();
  const id = params?.id;

  useEffect(() => {
    if (id && id !== "create") {
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      const { mess, code } = await runToolOKX(values);
      if (code === 200) message.info(mess);
    } catch (error) {
      message.error("Error server!");
    }
  };

  const handleRemove = async () => {};

  return (
    <div className="bg-white p-[40px] rounded-[6px]">
      <ToolAirdropForm
        id={id !== "create" ? id : undefined}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onRemove={handleRemove}
      />
    </div>
  );
}
