"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { decodedJWT, signJWT } from "./jwt";

const prisma = new PrismaClient();

export async function Login(infor: any) {
  const { username, password } = infor;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return { mess: "Incorrect username or password", code: 400 };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { mess: "Incorrect username or password", code: 400 };
    }

    const token = await signJWT({ userId: user.id });
    return { token, code: 200 };
  } catch (error) {
    return { mess: "Error server", code: 400 };
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("acc")?.value;

  if(!token) return { code: 401, mess: "Token has expired!" }
  try {
    const userId = await decodedJWT(token);
    if(!userId)  return { code: 401, mess: "Token has expired!" }

    const user = await prisma.user.findUnique({
      where: { id: userId, isActive: true },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
      }
    });
    if(!user) return { code: 400, mess: "Account does not exist!" }
    return { code: 200, data: user }
  } catch (error) {
    return { code: 500, mess: "Error server!" }
  }
}
