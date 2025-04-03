-- CreateEnum
CREATE TYPE "PriceVariationType" AS ENUM ('ABSOLUTE_INCREASE', 'ABSOLUTE_REDUCTION', 'PERCENTAGE_INCREASE', 'PERCENTAGE_REDUCTION', 'CUSTOM');

-- CreateTable
CREATE TABLE "season_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "availableWeekend" JSONB NOT NULL,
    "priceVariationType" "PriceVariationType" NOT NULL,
    "price" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "season_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season_rule_housing_unit_types" (
    "id" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,
    "seasonRuleId" TEXT NOT NULL,
    "baseWeekPrice" DOUBLE PRECISION NOT NULL,
    "newWeekPrice" DOUBLE PRECISION NOT NULL,
    "weekendBasePrice" DOUBLE PRECISION NOT NULL,
    "weekendNewPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "season_rule_housing_unit_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "season_rule_housing_unit_types_housingUnitTypeId_seasonRule_key" ON "season_rule_housing_unit_types"("housingUnitTypeId", "seasonRuleId");

-- AddForeignKey
ALTER TABLE "season_rules" ADD CONSTRAINT "season_rules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_rule_housing_unit_types" ADD CONSTRAINT "season_rule_housing_unit_types_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_rule_housing_unit_types" ADD CONSTRAINT "season_rule_housing_unit_types_seasonRuleId_fkey" FOREIGN KEY ("seasonRuleId") REFERENCES "season_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
