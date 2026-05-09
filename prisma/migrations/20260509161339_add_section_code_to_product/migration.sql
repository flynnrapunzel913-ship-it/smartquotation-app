-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "displayOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sectionCode" TEXT NOT NULL DEFAULT 'A',
ADD COLUMN     "specification" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "sections" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "QuotationItem" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "imageUrl" TEXT;

-- CreateIndex
CREATE INDEX "Product_sectionCode_idx" ON "Product"("sectionCode");
