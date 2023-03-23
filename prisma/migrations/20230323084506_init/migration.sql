/*
  Warnings:

  - You are about to drop the column `image` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `localArea` on the `Apartment` table. All the data in the column will be lost.
  - Added the required column `community` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "image",
DROP COLUMN "localArea",
ADD COLUMN     "community" VARCHAR(50) NOT NULL,
ADD COLUMN     "images" TEXT[];
