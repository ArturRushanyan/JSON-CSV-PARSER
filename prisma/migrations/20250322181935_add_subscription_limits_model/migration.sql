/*
  Warnings:

  - You are about to drop the column `requestLimit` on the `User` table. All the data in the column will be lost.
  - Added the required column `requestCount` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "requestLimit",
ADD COLUMN     "requestCount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SubscriptionLimits" (
    "id" TEXT NOT NULL,
    "price" MONEY NOT NULL,
    "requestLimit" INTEGER NOT NULL,

    CONSTRAINT "SubscriptionLimits_pkey" PRIMARY KEY ("id")
);
