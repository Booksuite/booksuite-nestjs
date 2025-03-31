-- CreateTable
CREATE TABLE "reservation_option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "billingType" "BillingType" NOT NULL,
    "additionalAdultPrice" DOUBLE PRECISION NOT NULL,
    "additionalChildrenPrice" DOUBLE PRECISION NOT NULL,
    "availableWeekend" JSONB NOT NULL,
    "additionalAgeGroupPrice" JSONB NOT NULL,
    "includedItems" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "reservation_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservationoption_housingunittype" (
    "id" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,
    "reservationOptionId" TEXT NOT NULL,

    CONSTRAINT "reservationoption_housingunittype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reservationoption_housingunittype_housingUnitTypeId_reserva_key" ON "reservationoption_housingunittype"("housingUnitTypeId", "reservationOptionId");

-- AddForeignKey
ALTER TABLE "reservation_option" ADD CONSTRAINT "reservation_option_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservationoption_housingunittype" ADD CONSTRAINT "reservationoption_housingunittype_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservationoption_housingunittype" ADD CONSTRAINT "reservationoption_housingunittype_reservationOptionId_fkey" FOREIGN KEY ("reservationOptionId") REFERENCES "reservation_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
