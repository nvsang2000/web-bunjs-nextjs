"use server";
import prisma from "../lib/connectPrisma";
import { getUserId } from "./auth";
import runJobOKX from "./job/okx";

export async function runToolOKX(values: any) {
  const { requestId } = values;

  const userId = await getUserId();
  if (!userId) return { mess: "Account does not exist!" };

  try {
    const result = await prisma.jobAirdrop.create({
      data: {
        ...values,
        requestId: JSON.stringify(requestId),
        userId: userId,
      },
    });

    setTimeout(() => {
      console.log("Worker job finished");
      runJobOKX(requestId).catch((err) => {
        console.error(err);
        process.exit(1);
      });
    }, 1000);

    return { mess: `Running job id ${result?.id} tool okx`, data:result };
  } catch (error) {
    console.log(error);
    return { mess: "Error server!" };
  }
}


export async function paginateToolAirdrop() {
  try {
      const result = await prisma.jobAirdrop.findMany({ });
      return { mess: "success", data: result }
  } catch (error) {
      return { mess: "Error server" };
  }
  
}
