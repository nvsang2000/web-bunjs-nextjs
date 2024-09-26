"use server";
import bcrypt from "bcrypt";
import prisma from "../lib/connectPrisma";

export async function initAdmin() {
  try {
    const result = await prisma.user.create({
      data: {
        email: "nvsang2670@gmail.com",
        fullName: "Nguyễn Văn Sang",
        username: "diepminh2670",
        phone: "0386237067",
        password: bcrypt.hashSync("Sang2607200209@", 10),
        role: "ADMIN",
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}
