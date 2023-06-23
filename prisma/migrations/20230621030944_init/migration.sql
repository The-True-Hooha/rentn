/*
  Warnings:

  - Added the required column `role` to the `Rentn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rentn" ADD COLUMN     "role" "ROLE" NOT NULL;
