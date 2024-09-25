/*
  Warnings:

  - You are about to drop the column `proxy` on the `auth_token` table. All the data in the column will be lost.
  - You are about to drop the column `requesId` on the `auth_token` table. All the data in the column will be lost.
  - Added the required column `teleToken` to the `auth_token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('OPEN', 'RUNNING', 'PENDING', 'STOP', 'REOPEN');

-- AlterTable
ALTER TABLE "auth_token" DROP COLUMN "proxy",
DROP COLUMN "requesId",
ADD COLUMN     "teleToken" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "job_airdrop" (
    "id" UUID NOT NULL,
    "nameTool" VARCHAR(255) NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'OPEN',
    "proxy" TEXT,
    "teleId" TEXT,
    "requestId" TEXT,
    "userId" UUID NOT NULL,
    "reopenAt" TIMESTAMPTZ,
    "updatedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_airdrop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_airdrop_userId_key" ON "job_airdrop"("userId");

-- AddForeignKey
ALTER TABLE "job_airdrop" ADD CONSTRAINT "job_airdrop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
