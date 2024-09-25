/*
  Warnings:

  - The `requestId` column on the `job_airdrop` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "job_airdrop" DROP COLUMN "requestId",
ADD COLUMN     "requestId" JSONB;
