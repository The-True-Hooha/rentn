/*
  Warnings:

  - You are about to alter the column `firstName` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `lastName` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `phoneNumber` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(11)`.
  - You are about to alter the column `email` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `password` on the `Agent` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - A unique constraint covering the columns `[agentNumber,agentEmail,agentId]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('Agent', 'User', 'Admin');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'Admin';

-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'Agent',
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "phoneNumber" SET DATA TYPE VARCHAR(11),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(16);

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "ROLE" NOT NULL DEFAULT 'User',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_agentNumber_agentEmail_agentId_key" ON "Apartment"("agentNumber", "agentEmail", "agentId");
