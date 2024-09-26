"use server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { decodedJWT, signJWT } from "./jwt";
import prisma from "../lib/connectPrisma";

export async function login(infor: any) {
  const { username, password } = infor;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: username },
          { phone: username },
        ],
      },
    });

    if (!user) {
      return { mess: "Incorrect username or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { mess: "Incorrect username or password" };
    }

    const token = await signJWT({ userId: user.id });
    return { token };
  } catch (error) {
    return { mess: "Error server" };
  }
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("acc")?.value;

  if(!token) return { mess: "Token has expired!" }
  try {
    const userId = await decodedJWT(token);
    if(!userId)  return { mess: "Token has expired!" }

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
    if(!user) return { mess: "Account does not exist!" }
    return { data: user }
  } catch (error) {
    return { mess: "Error server!" }
  }
}

export async function getUserId() {
  const cookieStore = cookies();
  const token = cookieStore.get("acc")?.value;
  if(token) {
    const userId = await decodedJWT(token);
    return userId
  } else return undefined
  
}