/*
  Warnings:

  - The required column `agentId` was added to the `Apartment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_profileId_fkey";

-- DropIndex
DROP INDEX "Price_apartmentId_key";

-- AlterTable
ALTER TABLE "Apartment" ADD COLUMN     "agentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Agent" (
    "agentId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentId")
);

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Profile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Agent"("agentId") ON DELETE RESTRICT ON UPDATE CASCADE;
