-- CreateEnum
CREATE TYPE "BannerAction" AS ENUM ('NONE', 'SMART_SEARCH', 'CUSTOM', 'SEND_TO_WHATSAPP');

-- CreateEnum
CREATE TYPE "BannerPosition" AS ENUM ('HOME_TOP', 'FEATURED_CONTENT');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('INN', 'HOTEL', 'RESORT', 'CHALET', 'FARM_HOTEL', 'AIRBNB', 'HOSTEL', 'FLAT_APART_HOTEL', 'CAMPING', 'OTHER');

-- CreateEnum
CREATE TYPE "FacilityType" AS ENUM ('HOUSING_UNIT_TYPE', 'COMPANY');

-- CreateEnum
CREATE TYPE "FacilityCategory" AS ENUM ('GENERAL', 'FOOD_AND_BEVERAGES', 'LEISURE_AREAS', 'ACTIVITIES', 'STRUCTURE', 'LANGUAGES_SPOKEN', 'INTERNET', 'SERVICES', 'BED_TYPES');

-- CreateEnum
CREATE TYPE "AgeGroupChargeType" AS ENUM ('DAILY_PER_CHILDREN', 'DAILY_PERCENTAGE_PER_CHILDREN', 'FREE');

-- CreateEnum
CREATE TYPE "CancellationPolicyPenalty" AS ENUM ('RESERVATION_PERCENTAGE', 'FULL_DAILIES_PERCENTAGE', 'FIRST_NIGHT_AMOUNT');

-- CreateEnum
CREATE TYPE "ReservationSaleChannel" AS ENUM ('RECEPTION', 'PHONE', 'WHATSAPP', 'INSTAGRAM', 'TIKTOK', 'EMAIL', 'BOOKSUITE', 'OTHER');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('WAITING_PAYMENT', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'ABANDONED', 'CANCELLED', 'PAYMENT_FAILED', 'OVERBOOKED', 'WAITING_LIST');

-- CreateEnum
CREATE TYPE "ReservationDepositType" AS ENUM ('PERCENTAGE_ON_RESERVATION', 'FULL_AMOUNT_ON_RESERVATION', 'DAYLIES_FULL_AMOUNT_ON_RESERVATION', 'FIRST_DAYLY_ON_RESERVATION', 'NO_CHARGE');

-- CreateEnum
CREATE TYPE "BillingType" AS ENUM ('PER_GUEST_DAILY', 'PER_GUEST', 'DAILY', 'PER_RESERVATION', 'PER_HOUSING_UNIT');

-- CreateEnum
CREATE TYPE "PriceVariationType" AS ENUM ('ABSOLUTE_INCREASE', 'ABSOLUTE_REDUCTION', 'PERCENTAGE_INCREASE', 'PERCENTAGE_REDUCTION', 'CUSTOM');

-- CreateTable
CREATE TABLE "banners" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" "BannerPosition" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "description" TEXT,
    "action" "BannerAction" NOT NULL,
    "actionButtonText" TEXT,
    "actionButtonLink" TEXT,
    "companyId" TEXT NOT NULL,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banner_medias" (
    "id" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "bannerId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "banner_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "type" "CompanyType" NOT NULL DEFAULT 'HOTEL',
    "timezone" TEXT,
    "logo" TEXT,
    "favIcon" TEXT,
    "settings" JSONB,
    "contacts" JSONB[],
    "responsible" TEXT NOT NULL,
    "responsibleEmail" TEXT NOT NULL,
    "responsiblePhone" TEXT NOT NULL,
    "docType" TEXT,
    "identification" TEXT,
    "companyName" TEXT,
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "address" TEXT,
    "zipcode" TEXT,
    "number" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "privacyPolicyDescription" TEXT,
    "privacyPolicySimpleModel" TEXT,
    "privacyPolicyFullModel" TEXT,
    "mapCoordinates" JSONB,
    "bannerImageId" TEXT,
    "bannerTitle" TEXT,
    "bannerDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hosting_rules" (
    "id" TEXT NOT NULL,
    "checkIn" INTEGER NOT NULL,
    "checkOut" INTEGER NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "fixedWindowPeriod" INTEGER NOT NULL,
    "reservationWindowStart" DATE,
    "reservationWindowEnd" DATE,
    "availableWeekend" JSONB NOT NULL,
    "availableWeekDays" JSONB NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "hosting_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_facilities" (
    "id" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "companyId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "type" "FacilityType" NOT NULL,
    "category" "FacilityCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "housing_unit_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "minGuests" INTEGER DEFAULT 1,
    "maxGuests" INTEGER DEFAULT 1,
    "maxAdults" INTEGER DEFAULT 0,
    "maxChildren" INTEGER DEFAULT 0,
    "weekdaysPrice" DOUBLE PRECISION NOT NULL,
    "weekendPrice" DOUBLE PRECISION NOT NULL,
    "extraAdultPrice" DOUBLE PRECISION NOT NULL,
    "chargeExtraAdultHigherThan" INTEGER NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "housing_unit_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "housing_units" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "housingUnitTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "housing_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "housing_unit_type_medias" (
    "id" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "housingUnitTypeId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "housing_unit_type_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "housing_unit_type_facilities" (
    "id" TEXT NOT NULL,
    "isFeatured" BOOLEAN DEFAULT false,
    "order" INTEGER DEFAULT 0,
    "housingUnitTypeId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "housing_unit_type_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "purchaseStartDate" DATE NOT NULL,
    "purchaseEndDate" DATE NOT NULL,
    "validStartDate" DATE,
    "validEndDate" DATE,
    "minDays" INTEGER,
    "maxDays" INTEGER,
    "minAdvanceDays" INTEGER,
    "maxAdvanceDays" INTEGER,
    "validForAbandoned" BOOLEAN NOT NULL DEFAULT false,
    "validForPackages" BOOLEAN NOT NULL DEFAULT false,
    "availableWeekDays" JSONB NOT NULL,
    "priceAdjustmentType" "PriceVariationType" NOT NULL,
    "priceAdjustmentValue" DOUBLE PRECISION NOT NULL,
    "showInHighlights" BOOLEAN NOT NULL DEFAULT false,
    "showDiscountTag" BOOLEAN NOT NULL DEFAULT false,
    "isExclusive" BOOLEAN NOT NULL DEFAULT false,
    "couponCode" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_housing_unit_types" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,

    CONSTRAINT "offer_housing_unit_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_payment_methods" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,

    CONSTRAINT "offer_payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_services" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "offer_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancellation_policies" (
    "id" TEXT NOT NULL,
    "applyCancellationTax" BOOLEAN,
    "defaultValue" INTEGER NOT NULL DEFAULT 0,
    "extraCancellationTax" BOOLEAN,
    "withdrawalPeriod" INTEGER NOT NULL,
    "dynamicDescription" TEXT,
    "otherDescription" TEXT,
    "flexModel" TEXT,
    "balancedModel" TEXT,
    "moderateModel" TEXT,
    "hardModel" TEXT,
    "companyId" TEXT NOT NULL,
    "defaultPenaltyBy" "CancellationPolicyPenalty" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cancellation_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penalty_ranges" (
    "id" TEXT NOT NULL,
    "daysBeforeCheckIn" INTEGER NOT NULL,
    "penaltyBy" "CancellationPolicyPenalty" NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "cancellationPolicyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "penalty_ranges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "age_policies" (
    "id" TEXT NOT NULL,
    "acceptChildren" BOOLEAN NOT NULL DEFAULT false,
    "adultMinAge" INTEGER NOT NULL DEFAULT 12,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "age_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "age_groups" (
    "id" TEXT NOT NULL,
    "initialAge" INTEGER NOT NULL,
    "finalAge" INTEGER NOT NULL,
    "chargeType" "AgeGroupChargeType" NOT NULL,
    "value" INTEGER,
    "agePolicyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "age_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "reservationCode" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalDays" INTEGER DEFAULT 1,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "status" "ReservationStatus" NOT NULL,
    "saleChannel" "ReservationSaleChannel" NOT NULL DEFAULT 'BOOKSUITE',
    "sellerUserId" TEXT,
    "guestUserId" TEXT,
    "companyId" TEXT NOT NULL,
    "housingUnitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_services" (
    "id" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "serviceId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "reservation_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_configs" (
    "id" TEXT NOT NULL,
    "tax" DOUBLE PRECISION,
    "reservationDepositType" "ReservationDepositType" NOT NULL,
    "reservationDepositTypeValue" DOUBLE PRECISION,
    "reservationPolicy" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservation_configs_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "season_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "visibilityStart" DATE,
    "visibilityEnd" DATE,
    "availableWeekDays" JSONB NOT NULL,
    "priceVariationType" "PriceVariationType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
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

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "billingType" "BillingType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "adults" INTEGER NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "minNotice" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "onlineSale" BOOLEAN NOT NULL DEFAULT false,
    "panelSale" BOOLEAN NOT NULL DEFAULT false,
    "seasonalSale" BOOLEAN NOT NULL DEFAULT false,
    "seasonStart" TIMESTAMP(3) NOT NULL,
    "seasonEnd" TIMESTAMP(3) NOT NULL,
    "hosting" JSONB,
    "availableWeekDays" JSONB,
    "description" TEXT NOT NULL,
    "included" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "coverMediaId" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_housingunittype" (
    "id" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "service_housingunittype_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_medias" (
    "id" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "serviceId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_date" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "description" TEXT,
    "generalDescription" TEXT,
    "availableWeekDays" JSONB NOT NULL,
    "priceVariationType" "PriceVariationType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "special_date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_date_housing_unit_types" (
    "id" TEXT NOT NULL,
    "housingUnitTypeId" TEXT NOT NULL,
    "specialDateId" TEXT NOT NULL,
    "baseWeekPrice" DOUBLE PRECISION NOT NULL,
    "newWeekPrice" DOUBLE PRECISION NOT NULL,
    "weekendBasePrice" DOUBLE PRECISION NOT NULL,
    "weekendNewPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "special_date_housing_unit_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_date_service" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "specialDateId" TEXT NOT NULL,

    CONSTRAINT "special_date_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "special_date_medias" (
    "id" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "specialDateId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "special_date_medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "confirmationCode" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "metaData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_companies" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "users_companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "permissions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "utility_links" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "startDate" DATE,
    "endDate" DATE,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "utility_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "banner_medias_bannerId_mediaId_key" ON "banner_medias"("bannerId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hosting_rules_companyId_key" ON "hosting_rules"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "company_facilities_companyId_facilityId_key" ON "company_facilities"("companyId", "facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "housing_unit_types_slug_key" ON "housing_unit_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "housing_unit_type_medias_housingUnitTypeId_mediaId_key" ON "housing_unit_type_medias"("housingUnitTypeId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "housing_unit_type_facilities_housingUnitTypeId_facilityId_key" ON "housing_unit_type_facilities"("housingUnitTypeId", "facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "offer_housing_unit_types_offerId_housingUnitTypeId_key" ON "offer_housing_unit_types"("offerId", "housingUnitTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "offer_payment_methods_offerId_paymentMethodId_key" ON "offer_payment_methods"("offerId", "paymentMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "offer_services_offerId_serviceId_key" ON "offer_services"("offerId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "cancellation_policies_companyId_key" ON "cancellation_policies"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "age_policies_companyId_key" ON "age_policies"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_services_reservationId_serviceId_key" ON "reservation_services"("reservationId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_configs_companyId_key" ON "reservation_configs"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_option_age_groups_ageGroupId_reservationOptionI_key" ON "reservation_option_age_groups"("ageGroupId", "reservationOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_option_housingunittype_housingUnitTypeId_reserv_key" ON "reservation_option_housingunittype"("housingUnitTypeId", "reservationOptionId");

-- CreateIndex
CREATE UNIQUE INDEX "season_rule_housing_unit_types_housingUnitTypeId_seasonRule_key" ON "season_rule_housing_unit_types"("housingUnitTypeId", "seasonRuleId");

-- CreateIndex
CREATE UNIQUE INDEX "service_housingunittype_housingUnitTypeId_serviceId_key" ON "service_housingunittype"("housingUnitTypeId", "serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "service_medias_serviceId_mediaId_key" ON "service_medias"("serviceId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "special_date_housing_unit_types_housingUnitTypeId_specialDa_key" ON "special_date_housing_unit_types"("housingUnitTypeId", "specialDateId");

-- CreateIndex
CREATE UNIQUE INDEX "special_date_service_serviceId_specialDateId_key" ON "special_date_service"("serviceId", "specialDateId");

-- CreateIndex
CREATE UNIQUE INDEX "special_date_medias_specialDateId_mediaId_key" ON "special_date_medias"("specialDateId", "mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner_medias" ADD CONSTRAINT "banner_medias_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banner_medias" ADD CONSTRAINT "banner_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hosting_rules" ADD CONSTRAINT "hosting_rules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_facilities" ADD CONSTRAINT "company_facilities_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_facilities" ADD CONSTRAINT "company_facilities_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_unit_types" ADD CONSTRAINT "housing_unit_types_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_units" ADD CONSTRAINT "housing_units_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_unit_type_medias" ADD CONSTRAINT "housing_unit_type_medias_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_unit_type_medias" ADD CONSTRAINT "housing_unit_type_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_unit_type_facilities" ADD CONSTRAINT "housing_unit_type_facilities_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "housing_unit_type_facilities" ADD CONSTRAINT "housing_unit_type_facilities_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_housing_unit_types" ADD CONSTRAINT "offer_housing_unit_types_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_housing_unit_types" ADD CONSTRAINT "offer_housing_unit_types_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_payment_methods" ADD CONSTRAINT "offer_payment_methods_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_payment_methods" ADD CONSTRAINT "offer_payment_methods_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_services" ADD CONSTRAINT "offer_services_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_services" ADD CONSTRAINT "offer_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancellation_policies" ADD CONSTRAINT "cancellation_policies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalty_ranges" ADD CONSTRAINT "penalty_ranges_cancellationPolicyId_fkey" FOREIGN KEY ("cancellationPolicyId") REFERENCES "cancellation_policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "age_policies" ADD CONSTRAINT "age_policies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "age_groups" ADD CONSTRAINT "age_groups_agePolicyId_fkey" FOREIGN KEY ("agePolicyId") REFERENCES "age_policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_sellerUserId_fkey" FOREIGN KEY ("sellerUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_guestUserId_fkey" FOREIGN KEY ("guestUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_housingUnitId_fkey" FOREIGN KEY ("housingUnitId") REFERENCES "housing_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_services" ADD CONSTRAINT "reservation_services_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_services" ADD CONSTRAINT "reservation_services_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_configs" ADD CONSTRAINT "reservation_configs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE "season_rules" ADD CONSTRAINT "season_rules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_rule_housing_unit_types" ADD CONSTRAINT "season_rule_housing_unit_types_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_rule_housing_unit_types" ADD CONSTRAINT "season_rule_housing_unit_types_seasonRuleId_fkey" FOREIGN KEY ("seasonRuleId") REFERENCES "season_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_housingunittype" ADD CONSTRAINT "service_housingunittype_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_housingunittype" ADD CONSTRAINT "service_housingunittype_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_medias" ADD CONSTRAINT "service_medias_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_medias" ADD CONSTRAINT "service_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date" ADD CONSTRAINT "special_date_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date_housing_unit_types" ADD CONSTRAINT "special_date_housing_unit_types_housingUnitTypeId_fkey" FOREIGN KEY ("housingUnitTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date_housing_unit_types" ADD CONSTRAINT "special_date_housing_unit_types_specialDateId_fkey" FOREIGN KEY ("specialDateId") REFERENCES "special_date"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date_service" ADD CONSTRAINT "special_date_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date_service" ADD CONSTRAINT "special_date_service_specialDateId_fkey" FOREIGN KEY ("specialDateId") REFERENCES "special_date"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date_medias" ADD CONSTRAINT "special_date_medias_specialDateId_fkey" FOREIGN KEY ("specialDateId") REFERENCES "special_date"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "special_date_medias" ADD CONSTRAINT "special_date_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "utility_links" ADD CONSTRAINT "utility_links_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
