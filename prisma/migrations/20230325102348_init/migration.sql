/*
  Warnings:

  - You are about to alter the column `password` on the `Admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(16)`.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "password" SET DATA TYPE VARCHAR(16);

-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "firstName" SET DATA TYPE TEXT,
ALTER COLUMN "lastName" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" VARCHAR(16) NOT NULL;
