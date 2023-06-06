/*
  Warnings:

  - You are about to drop the column `agentEmail` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `agentId` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `agentNumber` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileId` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_VERIFIED', 'VERIFIED');

-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('SUSPENDED', 'SCAMMER', 'ACTIVE', 'INACTIVE', 'DISABLED');

-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_agentNumber_agentEmail_agentId_fkey";

-- DropIndex
DROP INDEX "Apartment_agentNumber_agentEmail_agentId_key";

-- DropIndex
DROP INDEX "Apartment_apartmentId_apartmentType_address_community_key";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "agentEmail",
DROP COLUMN "agentId",
DROP COLUMN "agentNumber",
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "name" VARCHAR(50) NOT NULL,
ADD COLUMN     "profileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Agent";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Rentn" (
    "rentnId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_VERIFIED',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rentn_pkey" PRIMARY KEY ("rentnId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "profileId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "role" "ROLE" NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileStatus" "ProfileStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("profileId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rentn_email_key" ON "Rentn"("email");

-- CreateIndex
CREATE INDEX "Rentn_rentnId_idx" ON "Rentn"("rentnId");

-- CreateIndex
CREATE INDEX "Profile_profileId_idx" ON "Profile"("profileId");

-- AddForeignKey
ALTER TABLE "Rentn" ADD CONSTRAINT "Rentn_rentnId_fkey" FOREIGN KEY ("rentnId") REFERENCES "Profile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
