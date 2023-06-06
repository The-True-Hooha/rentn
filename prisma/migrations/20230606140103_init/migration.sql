-- DropIndex
DROP INDEX "Rentn_rentnId_idx";

-- CreateIndex
CREATE INDEX "Rentn_rentnId_email_idx" ON "Rentn"("rentnId", "email");
