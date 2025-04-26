/*
  Warnings:

  - The primary key for the `Accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `SubscriptionLimits` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SubscriptionLimits` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subscriptionLimitsId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userSecretsId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserSecrets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `UserSecrets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_subscriptionLimitsId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userSecretsId_fkey";

-- AlterTable
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubscriptionLimits" DROP CONSTRAINT "SubscriptionLimits_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SubscriptionLimits_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "subscriptionLimitsId",
ADD COLUMN     "subscriptionLimitsId" INTEGER,
DROP COLUMN "userSecretsId",
ADD COLUMN     "userSecretsId" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserSecrets" DROP CONSTRAINT "UserSecrets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UserSecrets_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_userSecretsId_key" ON "User"("userSecretsId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_subscriptionLimitsId_fkey" FOREIGN KEY ("subscriptionLimitsId") REFERENCES "SubscriptionLimits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userSecretsId_fkey" FOREIGN KEY ("userSecretsId") REFERENCES "UserSecrets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
