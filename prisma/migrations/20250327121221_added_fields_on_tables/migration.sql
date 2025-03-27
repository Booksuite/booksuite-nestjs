/*
  Warnings:

  - You are about to drop the column `fixedEnd` on the `hosting_rules` table. All the data in the column will be lost.
  - You are about to drop the column `fixedStart` on the `hosting_rules` table. All the data in the column will be lost.
  - You are about to drop the column `hostingWindowType` on the `hosting_rules` table. All the data in the column will be lost.
  - You are about to drop the column `openWindowDays` on the `hosting_rules` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `hosting_rules` table. All the data in the column will be lost.
  - Added the required column `fixedWindowPeriod` to the `hosting_rules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hosting_rules" DROP COLUMN "fixedEnd",
DROP COLUMN "fixedStart",
DROP COLUMN "hostingWindowType",
DROP COLUMN "openWindowDays",
DROP COLUMN "period",
ADD COLUMN     "fixedWindowPeriod" INTEGER NOT NULL,
ADD COLUMN     "reservationWindowEnd" DATE,
ADD COLUMN     "reservationWindowStart" DATE;
