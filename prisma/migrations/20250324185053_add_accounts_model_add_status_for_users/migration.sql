-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Pending', 'Active', 'Deleted');

-- CreateEnum
CREATE TYPE "AccountsStatus" AS ENUM ('Active', 'Deleted');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'Pending';

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "status" "AccountsStatus" NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);
