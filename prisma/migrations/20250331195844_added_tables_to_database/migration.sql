-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "privacyPolicyDescription" TEXT,
ADD COLUMN     "privacyPolicyFullModel" TEXT,
ADD COLUMN     "privacyPolicySimpleModel" TEXT;

-- CreateTable
CREATE TABLE "CompanyBio" (
    "id" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "buttonLink" TEXT NOT NULL,
    "startDate" DATE,
    "endDate" DATE,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "CompanyBio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompanyBio" ADD CONSTRAINT "CompanyBio_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
