"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getCurrentUser, login } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState<any>();
  const [accessToken, setAccessToken] = useState<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProfile()
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getCurrentUser();
      if (data) setCurrentUser(data);
      else return router.push('/login')
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const handleLogin = async (payload: any) => {
    setLoading(true);
    try {
      const { token } = await login(payload);
      if (token) {
        Cookies.set("acc", token, { expires: 30 });
        setAccessToken(token);
        await fetchProfile();
        router.push("/dashboard");
      }
    } catch (e: any) {
      console.log(e.message);
      setLoading(false);
    }
  };

  const logout = async () => {
    Cookies.remove("acc");
    router.refresh();
  };

  return {
    currentUser,
    setCurrentUser: (data: any) => {
      setCurrentUser(data)
    },
    fetchProfile,
    login: handleLogin,
    logout,
    loading,
  }
}

