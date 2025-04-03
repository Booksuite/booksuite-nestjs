-- CreateTable
CREATE TABLE "reservation_option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "billingType" "BillingType" NOT NULL,
    "additionalAdultPrice" DOUBLE PRECISION NOT NULL,
    "additionalChildrenPrice" DOUBLE PRECISION NOT NULL,
    "availableWeekend" JSONB NOT NULL,
    "includedItems" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservation_option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_option_age_groups" (
    "id" TEXT NOT NULL,
    "ageGroupId" TEXT NOT NULL,
    "reservationOptionId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "reservation_option_age_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_option_housingunittype" (
    "id" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,
    "reservationOptionId" TEXT NOT NULL,

    CONSTRAINT "reservation_option_housingunittype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reservation_option_age_groups_ageGroupId_reservationOptionI_key" ON "reservation_option_age_groups"("ageGroupId", "reservationOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_option_housingunittype_housingUnitTypeId_reserv_key" ON "reservation_option_housingunittype"("housingUnitTypeId", "reservationOptionId");

-- AddForeignKey
ALTER TABLE "reservation_option" ADD CONSTRAINT "reservation_option_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_option_age_groups" ADD CONSTRAINT "reservation_option_age_groups_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "age_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_option_age_groups" ADD CONSTRAINT "reservation_option_age_groups_reservationOptionId_fkey" FOREIGN KEY ("reservationOptionId") REFERENCES "reservation_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_option_housingunittype" ADD CONSTRAINT "reservation_option_housingunittype_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_option_housingunittype" ADD CONSTRAINT "reservation_option_housingunittype_reservationOptionId_fkey" FOREIGN KEY ("reservationOptionId") REFERENCES "reservation_option"("id") ON DELETE CASCADE ON UPDATE CASCADE;
