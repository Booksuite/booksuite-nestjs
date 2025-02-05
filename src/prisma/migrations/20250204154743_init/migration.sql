-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `surName` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `confirmationCode` VARCHAR(191) NULL,
    `roleId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `bookId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `guests_bookId_key`(`bookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `roles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `shortDescription` VARCHAR(191) NULL,
    `description` LONGTEXT NULL,
    `avaiableGuests` INTEGER NULL DEFAULT 0,
    `minGuests` INTEGER NULL DEFAULT 1,
    `maxGuests` INTEGER NULL DEFAULT 1,
    `maxAdults` INTEGER NULL DEFAULT 0,
    `maxChildren` INTEGER NULL DEFAULT 0,
    `weekdaysPrice` DOUBLE NOT NULL,
    `weekendPrice` DOUBLE NOT NULL,
    `extraAdultPrice` DOUBLE NOT NULL,
    `extraAdultPriceQtd` INTEGER NOT NULL,
    `banner` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `addressId` INTEGER NULL,
    `companyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `properties_slug_key`(`slug`),
    UNIQUE INDEX `properties_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property-medias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NULL DEFAULT 0,
    `propertyId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `property-conveniences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `isFeatured` BOOLEAN NULL DEFAULT false,
    `isBed` BOOLEAN NULL DEFAULT false,
    `bedQuantity` INTEGER NULL,
    `propertyId` INTEGER NOT NULL,
    `convenienceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conveniences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `shortDescription` VARCHAR(191) NULL,
    `description` LONGTEXT NULL,
    `policy` LONGTEXT NULL,
    `cancelPolicy` LONGTEXT NULL,
    `branchBusiness` VARCHAR(191) NULL,
    `timezone` VARCHAR(191) NULL,
    `thumbnail` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `logoFormat` VARCHAR(191) NULL,
    `favIcon` VARCHAR(191) NULL,
    `theme` VARCHAR(191) NULL,
    `responsible` VARCHAR(191) NOT NULL,
    `responsibleEmail` VARCHAR(191) NULL,
    `responsiblePhone` VARCHAR(191) NULL,
    `docType` VARCHAR(191) NOT NULL,
    `identification` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `stateRegistration` VARCHAR(191) NULL,
    `municipalRegistration` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `companies_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkIn` VARCHAR(191) NOT NULL,
    `checkOut` VARCHAR(191) NOT NULL,
    `minDaily` INTEGER NOT NULL,
    `weekendNights` JSON NULL,
    `hostingSeason` VARCHAR(191) NOT NULL,
    `hosting` JSON NULL,
    `hostingStartAt` DATETIME(3) NULL,
    `hostingEndAt` DATETIME(3) NULL,
    `specificDays` BOOLEAN NULL DEFAULT false,
    `days` JSON NULL,
    `propertyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rules_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `policies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NULL,
    `description` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cancel_policies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `daysBeforeCheckIn` INTEGER NOT NULL,
    `penaltyBy` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `companyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `age_policies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initialAge` INTEGER NOT NULL,
    `finalAge` INTEGER NOT NULL,
    `chargeType` VARCHAR(191) NOT NULL,
    `value` INTEGER NULL,
    `companyId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `zipCode` VARCHAR(191) NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `googleMapsUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` JSON NULL,
    `salesPhone` VARCHAR(191) NULL,
    `guestsPhone` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `cellphone` VARCHAR(191) NULL,
    `otherPhones` JSON NULL,
    `instagram` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `youtube` VARCHAR(191) NULL,
    `tiktok` VARCHAR(191) NULL,
    `tripAdvisor` VARCHAR(191) NULL,
    `otherSocialMedias` JSON NULL,
    `propertyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `contacts_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `totalDays` INTEGER NULL DEFAULT 1,
    `adults` INTEGER NOT NULL,
    `children` INTEGER NOT NULL,
    `saleChannel` VARCHAR(191) NOT NULL,
    `notes` LONGTEXT NOT NULL,
    `propertyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book-extras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qtd` INTEGER NOT NULL DEFAULT 1,
    `totalPrice` DOUBLE NOT NULL DEFAULT 0,
    `extraId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book-experiences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qtd` INTEGER NOT NULL DEFAULT 1,
    `totalPrice` DOUBLE NOT NULL DEFAULT 0,
    `experienceId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `billType` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `adults` INTEGER NOT NULL,
    `minDaily` INTEGER NOT NULL,
    `minNotice` INTEGER NOT NULL,
    `onlineSale` BOOLEAN NOT NULL DEFAULT false,
    `panelSale` BOOLEAN NOT NULL DEFAULT false,
    `seasonalSale` BOOLEAN NOT NULL DEFAULT false,
    `seasonStart` DATETIME(3) NOT NULL,
    `seasonEnd` DATETIME(3) NOT NULL,
    `hosting` JSON NULL,
    `nights` JSON NULL,
    `description` LONGTEXT NOT NULL,
    `included` LONGTEXT NOT NULL,
    `notes` LONGTEXT NOT NULL,
    `videoUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extra-categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `extraId` INTEGER NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `extra-medias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NULL DEFAULT 0,
    `extraId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience-extras` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qtd` INTEGER NOT NULL DEFAULT 1,
    `extraId` INTEGER NOT NULL,
    `experienceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experiences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NULL,
    `minDaily` INTEGER NOT NULL,
    `minNotice` INTEGER NOT NULL,
    `onlineSale` BOOLEAN NOT NULL DEFAULT false,
    `panelSale` BOOLEAN NOT NULL DEFAULT false,
    `seasonalSale` BOOLEAN NOT NULL DEFAULT false,
    `seasonStart` DATETIME(3) NOT NULL,
    `seasonEnd` DATETIME(3) NOT NULL,
    `hosting` JSON NULL,
    `nights` JSON NULL,
    `description` LONGTEXT NOT NULL,
    `notes` LONGTEXT NOT NULL,
    `videoUrl` VARCHAR(191) NULL,
    `price` DOUBLE NOT NULL,
    `priceAdjustment` VARCHAR(191) NULL,
    `discount` DOUBLE NOT NULL DEFAULT 0,
    `billType` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience-categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `experienceId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `experience-medias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order` INTEGER NULL DEFAULT 0,
    `experienceId` INTEGER NOT NULL,
    `mediaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment-configs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `applicableTax` DOUBLE NULL,
    `guarantee` VARCHAR(191) NULL,
    `guaranteePercentage` DOUBLE NULL,
    `pix` BOOLEAN NULL DEFAULT false,
    `pixDiscount` DOUBLE NULL DEFAULT 0,
    `creditCard` BOOLEAN NULL DEFAULT false,
    `maxInstallments` INTEGER NOT NULL,
    `minInstallments` INTEGER NULL DEFAULT 0,
    `creditCardTax` BOOLEAN NULL DEFAULT false,
    `installmentsTax` JSON NULL,
    `debitCard` BOOLEAN NULL DEFAULT false,
    `debitCardDiscount` DOUBLE NULL DEFAULT 0,
    `inCash` BOOLEAN NULL DEFAULT false,
    `inCashDiscount` DOUBLE NULL DEFAULT 0,
    `propertyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payment-configs_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `banners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `identification` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` MEDIUMTEXT NOT NULL,
    `actionButton` VARCHAR(191) NOT NULL,
    `actionButtonText` VARCHAR(191) NULL,
    `actionButtonLink` VARCHAR(191) NULL,
    `bannerFormat` VARCHAR(191) NOT NULL,
    `bannerImage` VARCHAR(191) NULL,
    `bannerVideoUrl` VARCHAR(191) NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `billType` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `includedItems` JSON NOT NULL,
    `nights` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxes_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NULL,
    `startAt` DATETIME(3) NOT NULL,
    `endAt` DATETIME(3) NOT NULL,
    `hosting` JSON NULL,
    `paymentTypes` JSON NOT NULL,
    `nights` JSON NOT NULL,
    `priceVariationType` VARCHAR(191) NOT NULL,
    `priceVariation` DOUBLE NOT NULL,
    `isFeatured` BOOLEAN NOT NULL,
    `disccountTag` BOOLEAN NOT NULL,
    `couponExclusive` BOOLEAN NOT NULL,
    `coupon` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `taxId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers_extras_experiences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offerId` INTEGER NOT NULL,
    `extraId` INTEGER NULL,
    `experienceId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guests` ADD CONSTRAINT `guests_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property-medias` ADD CONSTRAINT `property-medias_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property-medias` ADD CONSTRAINT `property-medias_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property-conveniences` ADD CONSTRAINT `property-conveniences_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `property-conveniences` ADD CONSTRAINT `property-conveniences_convenienceId_fkey` FOREIGN KEY (`convenienceId`) REFERENCES `conveniences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rules` ADD CONSTRAINT `rules_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cancel_policies` ADD CONSTRAINT `cancel_policies_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `age_policies` ADD CONSTRAINT `age_policies_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `books` ADD CONSTRAINT `books_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book-extras` ADD CONSTRAINT `book-extras_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `extras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book-extras` ADD CONSTRAINT `book-extras_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book-experiences` ADD CONSTRAINT `book-experiences_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `experiences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `book-experiences` ADD CONSTRAINT `book-experiences_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extra-categories` ADD CONSTRAINT `extra-categories_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `extras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extra-categories` ADD CONSTRAINT `extra-categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extra-medias` ADD CONSTRAINT `extra-medias_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `extras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `extra-medias` ADD CONSTRAINT `extra-medias_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience-extras` ADD CONSTRAINT `experience-extras_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `extras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience-extras` ADD CONSTRAINT `experience-extras_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `experiences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience-categories` ADD CONSTRAINT `experience-categories_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `experiences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience-categories` ADD CONSTRAINT `experience-categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience-medias` ADD CONSTRAINT `experience-medias_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `experiences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `experience-medias` ADD CONSTRAINT `experience-medias_mediaId_fkey` FOREIGN KEY (`mediaId`) REFERENCES `medias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payment-configs` ADD CONSTRAINT `payment-configs_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taxes_categories` ADD CONSTRAINT `taxes_categories_taxId_fkey` FOREIGN KEY (`taxId`) REFERENCES `taxes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taxes_categories` ADD CONSTRAINT `taxes_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_categories` ADD CONSTRAINT `offers_categories_taxId_fkey` FOREIGN KEY (`taxId`) REFERENCES `offers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_categories` ADD CONSTRAINT `offers_categories_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_extras_experiences` ADD CONSTRAINT `offers_extras_experiences_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `offers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_extras_experiences` ADD CONSTRAINT `offers_extras_experiences_extraId_fkey` FOREIGN KEY (`extraId`) REFERENCES `extras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `offers_extras_experiences` ADD CONSTRAINT `offers_extras_experiences_experienceId_fkey` FOREIGN KEY (`experienceId`) REFERENCES `experiences`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
