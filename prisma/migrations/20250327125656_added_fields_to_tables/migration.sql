/*
  Warnings:

  - You are about to drop the column `hostingOnSpecificDays` on the `hosting_rules` table. All the data in the column will be lost.
  - You are about to drop the column `seasonEnd` on the `hosting_rules` table. All the data in the column will be lost.
  - You are about to drop the column `seasonStart` on the `hosting_rules` table. All the data in the column will be lost.
  - Added the required column `fixedWindowPeriod` to the `hosting_rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "corporateReason" TEXT;

-- AlterTable
ALTER TABLE "hosting_rules" DROP COLUMN "hostingOnSpecificDays",
DROP COLUMN "seasonEnd",
DROP COLUMN "seasonStart",
ADD COLUMN     "fixedWindowPeriod" INTEGER NOT NULL,
ADD COLUMN     "reservationWindowEnd" DATE,
ADD COLUMN     "reservationWindowStart" DATE;
