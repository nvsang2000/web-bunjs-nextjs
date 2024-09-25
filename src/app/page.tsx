import React from "react";
import Link from "next/link";
import { getCurrentUser } from "../actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data } = await getCurrentUser();
  if (!data || data?.role !== "ADMIN") return redirect("/login");

  return (
    <div className="p-[40px] flex justify-center items-center text-center">
      <div className="text-[36px] font-bold text-white bg-[#008ef0] p-[10px] border-4 border-white shadow-lg">
        <div> Welcome to Diep Minh's airdrop farming tool.</div>
        <div>
          {" "}
          Please log in to use the service.{" "}
          <span>
            <Link href={"/login"} className="text-[var(--green)]">
              Login here!
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
