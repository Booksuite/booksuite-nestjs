-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "privacyPolicyDescription" TEXT,
ADD COLUMN     "privacyPolicyFullModel" TEXT,
ADD COLUMN     "privacyPolicySimpleModel" TEXT;

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
