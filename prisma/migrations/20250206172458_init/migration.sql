-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surName" TEXT,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "confirmationCode" TEXT,
    "roleId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bookId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "avaiableGuests" INTEGER DEFAULT 0,
    "minGuests" INTEGER DEFAULT 1,
    "maxGuests" INTEGER DEFAULT 1,
    "maxAdults" INTEGER DEFAULT 0,
    "maxChildren" INTEGER DEFAULT 0,
    "weekdaysPrice" DOUBLE PRECISION NOT NULL,
    "weekendPrice" DOUBLE PRECISION NOT NULL,
    "extraAdultPrice" DOUBLE PRECISION NOT NULL,
    "extraAdultPriceQtd" INTEGER NOT NULL,
    "banner" TEXT,
    "videoUrl" TEXT,
    "addressId" INTEGER,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property-medias" (
    "id" SERIAL NOT NULL,
    "order" INTEGER DEFAULT 0,
    "propertyId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property-medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property-conveniences" (
    "id" SERIAL NOT NULL,
    "isFeatured" BOOLEAN DEFAULT false,
    "isBed" BOOLEAN DEFAULT false,
    "bedQuantity" INTEGER,
    "propertyId" INTEGER NOT NULL,
    "convenienceId" INTEGER NOT NULL,

    CONSTRAINT "property-conveniences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conveniences" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conveniences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "policy" TEXT,
    "cancelPolicy" TEXT,
    "branchBusiness" TEXT,
    "timezone" TEXT,
    "thumbnail" TEXT,
    "logo" TEXT,
    "logoFormat" TEXT,
    "favIcon" TEXT,
    "theme" TEXT,
    "responsible" TEXT NOT NULL,
    "responsibleEmail" TEXT,
    "responsiblePhone" TEXT,
    "docType" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "stateRegistration" TEXT,
    "municipalRegistration" TEXT,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rules" (
    "id" SERIAL NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "weekendNights" JSONB,
    "hostingSeason" TEXT NOT NULL,
    "hosting" JSONB,
    "hostingStartAt" TIMESTAMP(3),
    "hostingEndAt" TIMESTAMP(3),
    "specificDays" BOOLEAN DEFAULT false,
    "days" JSONB,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancel_policies" (
    "id" SERIAL NOT NULL,
    "daysBeforeCheckIn" INTEGER NOT NULL,
    "penaltyBy" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cancel_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "age_policies" (
    "id" SERIAL NOT NULL,
    "initialAge" INTEGER NOT NULL,
    "finalAge" INTEGER NOT NULL,
    "chargeType" TEXT NOT NULL,
    "value" INTEGER,
    "companyId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "age_policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "zipCode" TEXT,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "googleMapsUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "email" JSONB,
    "salesPhone" TEXT,
    "guestsPhone" TEXT,
    "phone" TEXT,
    "cellphone" TEXT,
    "otherPhones" JSONB,
    "instagram" TEXT,
    "facebook" TEXT,
    "youtube" TEXT,
    "tiktok" TEXT,
    "tripAdvisor" TEXT,
    "otherSocialMedias" JSONB,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalDays" INTEGER DEFAULT 1,
    "adults" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "saleChannel" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book-extras" (
    "id" SERIAL NOT NULL,
    "qtd" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "extraId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "book-extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book-experiences" (
    "id" SERIAL NOT NULL,
    "qtd" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "experienceId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "book-experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extras" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "billType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "adults" INTEGER NOT NULL,
    "minDaily" INTEGER NOT NULL,
    "minNotice" INTEGER NOT NULL,
    "onlineSale" BOOLEAN NOT NULL DEFAULT false,
    "panelSale" BOOLEAN NOT NULL DEFAULT false,
    "seasonalSale" BOOLEAN NOT NULL DEFAULT false,
    "seasonStart" TIMESTAMP(3) NOT NULL,
    "seasonEnd" TIMESTAMP(3) NOT NULL,
    "hosting" JSONB,
    "nights" JSONB,
    "description" TEXT NOT NULL,
    "included" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "videoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extra-categories" (
    "id" SERIAL NOT NULL,
    "extraId" INTEGER,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "extra-categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extra-medias" (
    "id" SERIAL NOT NULL,
    "order" INTEGER DEFAULT 0,
    "extraId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "extra-medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience-extras" (
    "id" SERIAL NOT NULL,
    "qtd" INTEGER NOT NULL DEFAULT 1,
    "extraId" INTEGER NOT NULL,
    "experienceId" INTEGER NOT NULL,

    CONSTRAINT "experience-extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT,
    "minDaily" INTEGER NOT NULL,
    "minNotice" INTEGER NOT NULL,
    "onlineSale" BOOLEAN NOT NULL DEFAULT false,
    "panelSale" BOOLEAN NOT NULL DEFAULT false,
    "seasonalSale" BOOLEAN NOT NULL DEFAULT false,
    "seasonStart" TIMESTAMP(3) NOT NULL,
    "seasonEnd" TIMESTAMP(3) NOT NULL,
    "hosting" JSONB,
    "nights" JSONB,
    "description" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "videoUrl" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "priceAdjustment" TEXT,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "billType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience-categories" (
    "id" SERIAL NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "experience-categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience-medias" (
    "id" SERIAL NOT NULL,
    "order" INTEGER DEFAULT 0,
    "experienceId" INTEGER NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experience-medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment-configs" (
    "id" SERIAL NOT NULL,
    "applicableTax" DOUBLE PRECISION,
    "guarantee" TEXT,
    "guaranteePercentage" DOUBLE PRECISION,
    "pix" BOOLEAN DEFAULT false,
    "pixDiscount" DOUBLE PRECISION DEFAULT 0,
    "creditCard" BOOLEAN DEFAULT false,
    "maxInstallments" INTEGER NOT NULL,
    "minInstallments" INTEGER DEFAULT 0,
    "creditCardTax" BOOLEAN DEFAULT false,
    "installmentsTax" JSONB,
    "debitCard" BOOLEAN DEFAULT false,
    "debitCardDiscount" DOUBLE PRECISION DEFAULT 0,
    "inCash" BOOLEAN DEFAULT false,
    "inCashDiscount" DOUBLE PRECISION DEFAULT 0,
    "propertyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment-configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banners" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "identification" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "actionButton" TEXT NOT NULL,
    "actionButtonText" TEXT,
    "actionButtonLink" TEXT,
    "bannerFormat" TEXT NOT NULL,
    "bannerImage" TEXT,
    "bannerVideoUrl" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "billType" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "includedItems" JSONB NOT NULL,
    "nights" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "taxes_categories" (
    "id" SERIAL NOT NULL,
    "taxId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "taxes_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "hosting" JSONB,
    "paymentTypes" JSONB NOT NULL,
    "nights" JSONB NOT NULL,
    "priceVariationType" TEXT NOT NULL,
    "priceVariation" DOUBLE PRECISION NOT NULL,
    "isFeatured" BOOLEAN NOT NULL,
    "disccountTag" BOOLEAN NOT NULL,
    "couponExclusive" BOOLEAN NOT NULL,
    "coupon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers_categories" (
    "id" SERIAL NOT NULL,
    "taxId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers_extras_experiences" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "extraId" INTEGER,
    "experienceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_extras_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "guests_bookId_key" ON "guests"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_slug_key" ON "roles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "properties_slug_key" ON "properties"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "properties_addressId_key" ON "properties"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "companies_slug_key" ON "companies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "rules_propertyId_key" ON "rules"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_propertyId_key" ON "contacts"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "payment-configs_propertyId_key" ON "payment-configs"("propertyId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property-medias" ADD CONSTRAINT "property-medias_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property-medias" ADD CONSTRAINT "property-medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property-conveniences" ADD CONSTRAINT "property-conveniences_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property-conveniences" ADD CONSTRAINT "property-conveniences_convenienceId_fkey" FOREIGN KEY ("convenienceId") REFERENCES "conveniences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rules" ADD CONSTRAINT "rules_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cancel_policies" ADD CONSTRAINT "cancel_policies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "age_policies" ADD CONSTRAINT "age_policies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book-extras" ADD CONSTRAINT "book-extras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book-extras" ADD CONSTRAINT "book-extras_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book-experiences" ADD CONSTRAINT "book-experiences_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book-experiences" ADD CONSTRAINT "book-experiences_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra-categories" ADD CONSTRAINT "extra-categories_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "extras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra-categories" ADD CONSTRAINT "extra-categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra-medias" ADD CONSTRAINT "extra-medias_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra-medias" ADD CONSTRAINT "extra-medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience-extras" ADD CONSTRAINT "experience-extras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience-extras" ADD CONSTRAINT "experience-extras_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience-categories" ADD CONSTRAINT "experience-categories_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience-categories" ADD CONSTRAINT "experience-categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience-medias" ADD CONSTRAINT "experience-medias_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experience-medias" ADD CONSTRAINT "experience-medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment-configs" ADD CONSTRAINT "payment-configs_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxes_categories" ADD CONSTRAINT "taxes_categories_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "taxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "taxes_categories" ADD CONSTRAINT "taxes_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers_categories" ADD CONSTRAINT "offers_categories_taxId_fkey" FOREIGN KEY ("taxId") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers_categories" ADD CONSTRAINT "offers_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers_extras_experiences" ADD CONSTRAINT "offers_extras_experiences_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers_extras_experiences" ADD CONSTRAINT "offers_extras_experiences_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "extras"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers_extras_experiences" ADD CONSTRAINT "offers_extras_experiences_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "experiences"("id") ON DELETE SET NULL ON UPDATE CASCADE;
