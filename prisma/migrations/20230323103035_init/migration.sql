/*
  Warnings:

  - You are about to drop the column `rent` on the `Price` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "rent",
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL DEFAULT 0.00;
