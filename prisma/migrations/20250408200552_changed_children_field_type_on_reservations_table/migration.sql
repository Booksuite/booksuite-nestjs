/*
  Warnings:

  - You are about to drop the column `children` on the `reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "children";

-- CreateTable
CREATE TABLE "reservation_age_groups" (
    "id" TEXT NOT NULL,
    "ageGroupId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "children" INTEGER NOT NULL,

    CONSTRAINT "reservation_age_groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reservation_age_groups_ageGroupId_reservationId_key" ON "reservation_age_groups"("ageGroupId", "reservationId");

-- AddForeignKey
ALTER TABLE "reservation_age_groups" ADD CONSTRAINT "reservation_age_groups_ageGroupId_fkey" FOREIGN KEY ("ageGroupId") REFERENCES "age_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_age_groups" ADD CONSTRAINT "reservation_age_groups_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
