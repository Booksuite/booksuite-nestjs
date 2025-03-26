/*
  Warnings:

  - You are about to drop the column `hostingOnSpecificDays` on the `hosting_rules` table. All the data in the column will be lost.
  - Added the required column `hostingWindowType` to the `hosting_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openWindowDays` to the `hosting_rules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `hosting_rules` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HostingWindowType" AS ENUM ('DYNAMIC', 'FIXED');

-- CreateEnum
CREATE TYPE "Period" AS ENUM ('THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR', 'TWO_YEAR', 'CUSTOM');

-- AlterTable
ALTER TABLE "hosting_rules" DROP COLUMN "hostingOnSpecificDays",
ADD COLUMN     "hostingWindowType" "HostingWindowType" NOT NULL,
ADD COLUMN     "openWindowDays" INTEGER NOT NULL,
ADD COLUMN     "period" "Period" NOT NULL,
ALTER COLUMN "seasonStart" DROP NOT NULL,
ALTER COLUMN "seasonEnd" DROP NOT NULL;
