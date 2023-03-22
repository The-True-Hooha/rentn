/*
  Warnings:

  - You are about to drop the column `agenEmail` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `localty` on the `Apartment` table. All the data in the column will be lost.
  - Added the required column `agentEmail` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localArea` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_agentNumber_agenEmail_agentId_fkey";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "agenEmail",
DROP COLUMN "localty",
ADD COLUMN     "agentEmail" TEXT NOT NULL,
ADD COLUMN     "localArea" VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_agentNumber_agentEmail_agentId_fkey" FOREIGN KEY ("agentNumber", "agentEmail", "agentId") REFERENCES "Agent"("phoneNumber", "email", "agentId") ON DELETE CASCADE ON UPDATE CASCADE;
