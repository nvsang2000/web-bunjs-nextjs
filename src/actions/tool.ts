"use server";
import prisma from "../lib/connectPrisma";
import runJobOKX from "./job/okx";

export async function runToolOKX(userId: string, values: any) {
  const { requestId } = values;

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
      runJobOKX(requestId).catch((err) => {
        console.error(err);
        process.exit(1);
      });
    }, 1000);

    return { mess: `Running job id ${result?.id} tool okx`, data: result };
  } catch (error) {
    console.log(error);
    return { mess: "Error server!" };
  }
}

export async function paginate() {
  const result = await prisma.jobAirdrop.findMany({});
  return result;
}

export async function findOne() {
  const result = await prisma.jobAirdrop.findMany({});
  return result;
}
