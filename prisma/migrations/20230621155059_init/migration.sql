/*
  Warnings:

  - You are about to drop the column `status` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_profileId_key" ON "Apartment"("profileId");
