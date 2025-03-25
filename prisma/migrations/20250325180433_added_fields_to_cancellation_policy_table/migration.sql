/*
  Warnings:

  - You are about to drop the column `text` on the `cancellation_policies` table. All the data in the column will be lost.
  - Added the required column `withDrawalPeriod` to the `cancellation_policies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cancellation_policies" DROP COLUMN "text",
ADD COLUMN     "applyCancellationTax" BOOLEAN,
ADD COLUMN     "balancedModel" TEXT,
ADD COLUMN     "dynamicDescription" TEXT,
ADD COLUMN     "extraCancellationTax" BOOLEAN,
ADD COLUMN     "flexModel" TEXT,
ADD COLUMN     "hardModel" TEXT,
ADD COLUMN     "moderateModel" TEXT,
ADD COLUMN     "otherDescription" TEXT,
ADD COLUMN     "withDrawalPeriod" INTEGER NOT NULL;
