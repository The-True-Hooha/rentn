/*
  Warnings:

  - A unique constraint covering the columns `[apartmentId,appartmentType,address,community]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Apartment_address_key";

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentId_appartmentType_address_community_key" ON "Apartment"("apartmentId", "appartmentType", "address", "community");
