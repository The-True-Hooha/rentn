-- DropForeignKey
ALTER TABLE "Rentn" DROP CONSTRAINT "Rentn_rentnId_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Rentn"("rentnId") ON DELETE RESTRICT ON UPDATE CASCADE;
