-- CreateEnum
CREATE TYPE "productExtras" AS ENUM ('Cheese', 'Onions', 'Olives');

-- CreateTable
CREATE TABLE "Extras" (
    "id" TEXT NOT NULL,
    "name" "productExtras" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT,

    CONSTRAINT "Extras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extras" ADD CONSTRAINT "Extras_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
