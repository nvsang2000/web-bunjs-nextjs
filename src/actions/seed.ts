"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function InitAdmin() {
    try {
        const result = await prisma.user.create({
            data: {
              email: 'nvsang2670@gmail.com',
              fullName: 'Nguyễn Văn Sang',
              username: 'diepminh2670',
              phone: '0386237067',
              password: bcrypt.hashSync('Sang2607200209@', 10),
              role: 'ADMIN',
            },
          });

        return result
    } catch (error) {
        console.log(error)
    }
}