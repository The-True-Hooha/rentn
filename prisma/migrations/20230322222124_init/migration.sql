-- CreateTable
CREATE TABLE "Agent" (
    "agentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("agentId")
);

-- CreateTable
CREATE TABLE "Price" (
    "priceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rent" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "tenure" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "apartmentType" TEXT NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("priceId")
);

-- CreateTable
CREATE TABLE "Apartment" (
    "apartmentId" TEXT NOT NULL,
    "description" VARCHAR(5000) NOT NULL,
    "address" VARCHAR(200) NOT NULL,
    "localty" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appartmentType" TEXT NOT NULL,
    "agentNumber" TEXT NOT NULL,
    "agenEmail" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "image" TEXT,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("apartmentId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "adminId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "homeAddress" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_phoneNumber_key" ON "Agent"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE INDEX "Agent_agentId_idx" ON "Agent"("agentId");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_phoneNumber_email_agentId_key" ON "Agent"("phoneNumber", "email", "agentId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_apartmentId_key" ON "Price"("apartmentId");

-- CreateIndex
CREATE INDEX "Price_priceId_idx" ON "Price"("priceId");

-- CreateIndex
CREATE UNIQUE INDEX "Price_apartmentId_apartmentType_key" ON "Price"("apartmentId", "apartmentType");

-- CreateIndex
CREATE INDEX "Apartment_apartmentId_idx" ON "Apartment"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_apartmentId_appartmentType_key" ON "Apartment"("apartmentId", "appartmentType");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phoneNumber_key" ON "Admin"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Admin_adminId_idx" ON "Admin"("adminId");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_apartmentId_apartmentType_fkey" FOREIGN KEY ("apartmentId", "apartmentType") REFERENCES "Apartment"("apartmentId", "appartmentType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_agentNumber_agenEmail_agentId_fkey" FOREIGN KEY ("agentNumber", "agenEmail", "agentId") REFERENCES "Agent"("phoneNumber", "email", "agentId") ON DELETE CASCADE ON UPDATE CASCADE;
