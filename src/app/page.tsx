import React from "react";
import Link from "next/link";

export default  function Home() {
  return (
    <div className="p-[40px] flex justify-center items-center text-center">
      <div className="text-[36px] font-bold ">
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
