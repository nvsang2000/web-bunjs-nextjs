"use client"
import { useEffect, useState } from "react";
import { paginate } from "../actions/users";

export default function useUser() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    fetch()
  }, []);
  
  const fetch = async () => {
    try {
      const result = await paginate();
      if(result) setUsers(result)
    } catch (error) {
      return { mess: "Error server" };
    }
  };

  return {
    users,
    refetch: fetch,
  };
}
