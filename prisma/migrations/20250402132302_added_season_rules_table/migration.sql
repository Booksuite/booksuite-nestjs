-- CreateEnum
CREATE TYPE "PriceVariationType" AS ENUM ('ABSOLUTE_INCREASE', 'ABSOLUTE_REDUCTION', 'PERCENTAGE_INCREASE', 'PERCENTAGE_REDUCTION', 'CUSTOM');

-- CreateTable
CREATE TABLE "SeasonRules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "published" BOOLEAN,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "availableWeekend" JSONB NOT NULL,
    "priceVariationType" "PriceVariationType" NOT NULL,
    "price" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "SeasonRules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasonRule_housingunittype" (
    "id" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,
    "seasonRuleId" TEXT NOT NULL,
    "baseWeekPrice" DOUBLE PRECISION NOT NULL,
    "newWeekPrice" DOUBLE PRECISION NOT NULL,
    "weekendBasePrice" DOUBLE PRECISION NOT NULL,
    "weekendNewPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "seasonRule_housingunittype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seasonRule_housingunittype_housingUnitTypeId_seasonRuleId_key" ON "seasonRule_housingunittype"("housingUnitTypeId", "seasonRuleId");

-- AddForeignKey
ALTER TABLE "SeasonRules" ADD CONSTRAINT "SeasonRules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasonRule_housingunittype" ADD CONSTRAINT "seasonRule_housingunittype_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasonRule_housingunittype" ADD CONSTRAINT "seasonRule_housingunittype_seasonRuleId_fkey" FOREIGN KEY ("seasonRuleId") REFERENCES "SeasonRules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
