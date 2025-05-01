/*
  Warnings:

  - A unique constraint covering the columns `[userSecretsId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userSecretsId" TEXT;

-- CreateTable
CREATE TABLE "UserSecrets" (
    "id" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSecrets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSecrets_secretKey_key" ON "UserSecrets"("secretKey");

-- CreateIndex
CREATE UNIQUE INDEX "User_userSecretsId_key" ON "User"("userSecretsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSecretsId_fkey" FOREIGN KEY ("userSecretsId") REFERENCES "UserSecrets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
