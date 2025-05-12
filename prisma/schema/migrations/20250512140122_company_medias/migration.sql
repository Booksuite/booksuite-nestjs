-- CreateTable
CREATE TABLE "company_medias" (
    "id" TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    "companyId" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "company_medias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_medias_companyId_mediaId_key" ON "company_medias"("companyId", "mediaId");

-- AddForeignKey
ALTER TABLE "company_medias" ADD CONSTRAINT "company_medias_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_medias" ADD CONSTRAINT "company_medias_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
