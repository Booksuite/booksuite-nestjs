/*
  Warnings:

  - You are about to drop the column `isFeatured` on the `company_medias` table. All the data in the column will be lost.
  - You are about to drop the `special_date_service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "special_date_service" DROP CONSTRAINT "special_date_service_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "special_date_service" DROP CONSTRAINT "special_date_service_specialDateId_fkey";

-- AlterTable
ALTER TABLE "company_medias" DROP COLUMN "isFeatured";

-- DropTable
DROP TABLE "special_date_service";
