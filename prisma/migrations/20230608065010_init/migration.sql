/*
  Warnings:

  - Added the required column `otp` to the `Rentn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret` to the `Rentn` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rentn" ADD COLUMN     "otp" TEXT NOT NULL,
ADD COLUMN     "secret" TEXT NOT NULL;
