/*
  Warnings:

  - You are about to drop the `CompanyBio` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyBio" DROP CONSTRAINT "CompanyBio_companyId_fkey";

-- DropTable
DROP TABLE "CompanyBio";

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

-- AddForeignKey
ALTER TABLE "utility_links" ADD CONSTRAINT "utility_links_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
