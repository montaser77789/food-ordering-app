/*
  Warnings:

  - You are about to drop the column `City` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Country` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "City",
DROP COLUMN "country",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT;
