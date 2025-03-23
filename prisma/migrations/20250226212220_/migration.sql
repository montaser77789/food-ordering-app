-- AlterTable
ALTER TABLE "product" ADD COLUMN     "catagoryId" TEXT;

-- CreateTable
CREATE TABLE "catagory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "catagory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_catagoryId_fkey" FOREIGN KEY ("catagoryId") REFERENCES "catagory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
