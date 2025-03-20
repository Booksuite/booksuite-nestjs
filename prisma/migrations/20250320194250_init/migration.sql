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
    "responsibleEmail" TEXT,
    "responsiblePhone" TEXT,
    "docType" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "address" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "mapCoordinates" JSONB NOT NULL,
    "bannerImageId" TEXT,
    "bannerTitle" TEXT,
    "bannerDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_facilities" (
    "id" TEXT NOT NULL,
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
CREATE TABLE "cancellation_policies" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "defaultPenaltyBy" "CancellationPolicyPenalty" NOT NULL,
    "defaultValue" INTEGER NOT NULL DEFAULT 0,
    "companyId" TEXT NOT NULL,
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
CREATE TABLE "ReservationConfig" (
    "id" TEXT NOT NULL,
    "tax" DOUBLE PRECISION,
    "reservationDepositType" "ReservationDepositType" NOT NULL,
    "reservationDepositTypeValue" DOUBLE PRECISION,
    "reservationPolicy" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReservationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "billType" TEXT NOT NULL,
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
    "housingUniTypeId" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "housing_unit_types_slug_key" ON "housing_unit_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "cancellation_policies_companyId_key" ON "cancellation_policies"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "age_policies_companyId_key" ON "age_policies"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "ReservationConfig_companyId_key" ON "ReservationConfig"("companyId");

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
ALTER TABLE "ReservationConfig" ADD CONSTRAINT "ReservationConfig_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_housingunittype" ADD CONSTRAINT "service_housingunittype_housingUniTypeId_fkey" FOREIGN KEY ("housingUniTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_housingunittype" ADD CONSTRAINT "service_housingunittype_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_medias" ADD CONSTRAINT "service_medias_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_medias" ADD CONSTRAINT "service_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_companies" ADD CONSTRAINT "users_companies_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
