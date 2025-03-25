-- CreateTable
CREATE TABLE "HostingRules" (
    "id" TEXT NOT NULL,
    "checkIn" INTEGER NOT NULL,
    "checkOut" INTEGER NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "seasonStart" DATE NOT NULL,
    "seasonEnd" DATE NOT NULL,
    "hostingOnSpecificDays" BOOLEAN NOT NULL,
    "availableWeekend" JSONB NOT NULL,
    "availableWeekDays" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "HostingRules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostingRules_companyId_key" ON "HostingRules"("companyId");

-- AddForeignKey
ALTER TABLE "HostingRules" ADD CONSTRAINT "HostingRules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
