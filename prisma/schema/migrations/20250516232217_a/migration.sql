-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ReservationStatus" ADD VALUE 'PRE_ORDER';
ALTER TYPE "ReservationStatus" ADD VALUE 'ESTIMATE';

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "preOrderExpiraiton" TIMESTAMP(3);
