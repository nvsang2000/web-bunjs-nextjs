"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { InitAdmin } from "../actions/seed";
import { Button, message } from "antd";

export default async function Home() {

  const generateInit = async () => {
    const result = await InitAdmin()
    message.success(`${result}`)
  }

  return (
    <div className="p-[40px]">
      <div>
        Welcome to Diep Minh's airdrop farming tool, please log in to use the
        service.
        <span>
          <Link href={"/login"} className="text-[var(--green)]">
            Login here!
          </Link>
        </span>
      </div>
      <div className="mt-[20px]"><Button onClick={generateInit}>Generate addmin</Button></div>
    </div>
  );
}
