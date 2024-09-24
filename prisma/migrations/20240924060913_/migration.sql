-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "policies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "permissions" JSONB,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ,
    "updatedById" UUID,
    "createrId" UUID,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(24) NOT NULL,
    "username" VARCHAR(128) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "thumbnail" VARCHAR(400),
    "isActive" BOOLEAN DEFAULT true,
    "lastSeen" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "policyId" INTEGER,
    "createrId" UUID,
    "authId" UUID,
    "updatedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_token" (
    "id" UUID NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "teleId" TEXT NOT NULL,
    "proxy" TEXT NOT NULL,
    "requesId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "updatedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "policies_name_key" ON "policies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "auth_token_userId_key" ON "auth_token"("userId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_token" ADD CONSTRAINT "auth_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
