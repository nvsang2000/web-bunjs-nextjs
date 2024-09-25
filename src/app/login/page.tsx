"use client";
import NextLink from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { message } from "antd";
import { Login } from "../../actions/auth";
import { LoginForm, RegisterForm } from "../../components";

export default function AuthForm() {
  const { push } = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const login = async (payload: any) => {
    setLoading(true);
    try {
      const { token, mess } = await Login(payload);
      if (!token) message.error(mess);
      else {
        Cookies.set("acc", token, { expires: 30 });
        push("/dashboard");
      }
      setLoading(false);
    } catch (e: any) {
      message.error(`Error server: ${e}`);
      setLoading(false);
    }
  };
  const register = () => {};
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url("/img/airdrop.jpg")` }}
    >
      <div className="flex items-center justify-center  py-[80px]">
        <div className="w-full max-w-md rounded bg-white shadow-md border border-gray-300 p-[60px]">
          <NextLink
            className="flex justify-center items-center gap-1 text-[20px] mb-[10px]"
            href="/"
          >
            <p className="font-bold !text-[var(--green)]">
              Tool Airdrop Telegram
            </p>
          </NextLink>
          <div className="mt-[20px]">
            {isLogin ? (
              <LoginForm onSubmit={login} loading={loading} />
            ) : (
              <RegisterForm onSubmit={register} />
            )}
          </div>
          <div className="flex justify-between">
            <div className="cursor-pointer text-[#006fee] text-[16px]">
              Forgot password?
            </div>
            <div
              className="cursor-pointer text-[#006fee] text-[16px]"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
