/*
  Warnings:

  - You are about to drop the column `categoryId` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `nights` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `services` table. All the data in the column will be lost.
  - You are about to drop the `service_categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_categoryId_fkey";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "categoryId",
DROP COLUMN "nights",
DROP COLUMN "videoUrl",
ADD COLUMN     "availableWeekDays" JSONB,
ADD COLUMN     "coverMediaId" TEXT;

-- DropTable
DROP TABLE "service_categories";

-- CreateTable
CREATE TABLE "service_housingunittype" (
    "id" TEXT NOT NULL,
    "housingUniTypeId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "service_housingunittype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_coverMediaId_fkey" FOREIGN KEY ("coverMediaId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_housingunittype" ADD CONSTRAINT "service_housingunittype_housingUniTypeId_fkey" FOREIGN KEY ("housingUniTypeId") REFERENCES "housing_unit_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_housingunittype" ADD CONSTRAINT "service_housingunittype_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
