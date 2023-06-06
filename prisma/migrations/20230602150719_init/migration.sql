/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Apartment_address_key" ON "Apartment"("address");
