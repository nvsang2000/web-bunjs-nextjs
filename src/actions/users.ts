"use server";
import prisma from "../lib/connectPrisma";

export async function paginate() {
  const result = await prisma.user.findMany({});
  return result;
}
