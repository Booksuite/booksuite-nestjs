-- CreateTable
CREATE TABLE "PaymentMethods" (
    "id" TEXT NOT NULL,
    "guaranteeType" "ReservationDepositType" NOT NULL,
    "percentageChargedValue" DOUBLE PRECISION NOT NULL,
    "pix" BOOLEAN,
    "pixDiscount" DOUBLE PRECISION,
    "creditCard" BOOLEAN,
    "installmentsMaxNumber" INTEGER,
    "InstallmentsMinValue" DOUBLE PRECISION,
    "installments" JSONB,
    "debitCard" BOOLEAN,
    "debitCardDiscount" DOUBLE PRECISION,
    "onHotel" BOOLEAN,
    "onHotelDiscount" DOUBLE PRECISION,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "PaymentMethods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentMethods_companyId_key" ON "PaymentMethods"("companyId");

-- AddForeignKey
ALTER TABLE "PaymentMethods" ADD CONSTRAINT "PaymentMethods_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
