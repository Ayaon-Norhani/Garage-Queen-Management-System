/*
  Warnings:

  - You are about to drop the column `productId` on the `DownloadVerification` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `DownloadVerification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DownloadVerification" DROP CONSTRAINT "DownloadVerification_productId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- AlterTable
ALTER TABLE "DownloadVerification" DROP COLUMN "productId",
ADD COLUMN     "memberId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productId",
ADD COLUMN     "memberId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DownloadVerification" ADD CONSTRAINT "DownloadVerification_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
