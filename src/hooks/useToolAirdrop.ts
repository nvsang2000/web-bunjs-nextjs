"use client"
import { useEffect, useState } from "react";
import { paginate } from "../actions/tool";

export default function useToolAirdrop() {
  const [toolAirdrops, setToolAirdrops] = useState<any>([]);

  useEffect(() => {
    fetch()
  }, []);
  
  const fetch = async () => {
    try {
      const result = await paginate();
      if(result) setToolAirdrops(result)
    } catch (error) {
      return { mess: "Error server" };
    }
  };

  return {
    toolAirdrops,
    refetch: fetch,
  };
}
