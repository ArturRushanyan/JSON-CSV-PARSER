/*
  Warnings:

  - Added the required column `name` to the `SubscriptionLimits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SubscriptionLimits" ADD COLUMN     "name" TEXT NOT NULL;
