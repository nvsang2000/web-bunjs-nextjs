"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function paginateUser() {
    try {
        const result = await prisma.user.findMany({ });
        return { mess: "success", data: result, code: 200 }
    } catch (error) {
        return { mess: "Error server", code: 500 };
    }
    
}