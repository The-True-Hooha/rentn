/*
  Warnings:

  - You are about to drop the column `appartmentType` on the `Apartment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apartmentId,apartmentType,address,community]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apartmentId,apartmentType]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apartmentType` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_apartmentId_apartmentType_fkey";

-- DropIndex
DROP INDEX "Apartment_apartmentId_appartmentType_address_community_key";

-- DropIndex
DROP INDEX "Apartment_apartmentId_appartmentType_key";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "appartmentType",
ADD COLUMN     "apartmentType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentId_apartmentType_address_community_key" ON "Apartment"("apartmentId", "apartmentType", "address", "community");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentId_apartmentType_key" ON "Apartment"("apartmentId", "apartmentType");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_apartmentId_apartmentType_fkey" FOREIGN KEY ("apartmentId", "apartmentType") REFERENCES "Apartment"("apartmentId", "apartmentType") ON DELETE RESTRICT ON UPDATE CASCADE;
