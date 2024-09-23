"use server"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "lH89EjFf1X6aDsmaFpVrd1m1Ii9vu7oO";

export async function Login(infor: any) {
  const { username, password } = infor;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return { message: "Incorrect username or password", code: 400 };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return { message: "Incorrect username or password", code: 400 };
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token };
  } catch (error) {
    return { message: "Error server", code: 400 };
  }
}
